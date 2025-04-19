import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useSocket from '../hooks/useSocket';
import Modal from '../components/Modal';

const statusColors = {
  disponivel: 'bg-green-500',
  ocupado: 'bg-red-500',
  manutencao: 'bg-yellow-500',
};

const statusOptions = ['disponivel', 'ocupado', 'manutencao'];

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const roomUpdated = useSocket('roomUpdated');

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (err) {
        setError('Erro ao carregar os quartos');
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  useEffect(() => {
    if (roomUpdated) {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomUpdated.id ? roomUpdated : room
        )
      );
    }
  }, [roomUpdated]);

  const openModal = (room) => {
    setSelectedRoom(room);
    setNewStatus(room.status);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRoom(null);
  };

  const confirmStatusChange = async () => {
    try {
      await axios.put(\`/api/rooms/\${selectedRoom.id}\`, { status: newStatus });
      closeModal();
    } catch (err) {
      alert('Erro ao atualizar status do quarto');
    }
  };

  if (loading) return <p>Carregando quartos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestão de Quartos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`p-4 rounded shadow text-white cursor-pointer ${statusColors[room.status] || 'bg-gray-400'}`}
            onClick={() => openModal(room)}
          >
            <h3 className="text-xl font-semibold">Quarto {room.numero}</h3>
            <p>Status: {room.status}</p>
            {room.observacoes && <p className="mt-2 text-sm">{room.observacoes}</p>}
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        title={selectedRoom ? \`Alterar status do quarto \${selectedRoom.numero}\` : ''}
        onClose={closeModal}
        onConfirm={confirmStatusChange}
      >
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </Modal>
    </div>
  );
}
