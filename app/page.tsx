'use client';
import React, { useState } from 'react';

const times = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'];
const epg = {
  'KQ105 TV': ['Noticias', 'Música Urbana', 'Podcast en Vivo', 'Programación Especial'],
  'Eventos 1': ['Previa del Evento', 'Combate 1', 'Combate 2', 'Combate Final']
};

const channels = [
  {
    name: 'KQ105 TV',
    m3u8: 'https://ssh101stream.ssh101.com/akamaissh101/ssh101/kq105/playlist.m3u8'
  },
  {
    name: 'Eventos 1',
    m3u8: 'https://giatv.bozztv.com/giatv/giatv-PPVDeportes2/PPVDeportes2/playlist.m3u8'
  }
];

export default function Page() {
  const [selectedStream, setSelectedStream] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState({ channel: null, index: null });

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl mb-4">TV Guide</h1>

      <div className="grid grid-cols-[150px_repeat(4,1fr)] gap-1 mb-6">
        <div className="bg-gray-800 p-2 font-bold">Channel / Time</div>
        {times.map((time, i) => (
          <div key={i} className="bg-gray-800 p-2 font-bold text-center">{time}</div>
        ))}

        {channels.map((channel) => (
          <React.Fragment key={channel.name}>
            <div className="bg-gray-800 p-2 font-semibold cursor-pointer hover:bg-yellow-600" onClick={() => setSelectedStream(channel)}>{channel.name}</div>
            {epg[channel.name].map((program, idx) => (
              <div
                key={idx}
                className={`p-2 text-center cursor-pointer transition-all duration-200 ${
                  selectedProgram.channel === channel.name && selectedProgram.index === idx
                    ? 'bg-yellow-500 text-black scale-105'
                    : 'bg-gray-700 hover:bg-yellow-600'
                }`}
                onClick={() => setSelectedProgram({ channel: channel.name, index: idx })}
              >
                {program}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {selectedProgram.channel !== null && (
        <div className="mb-6 p-4 bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-2">Información del Programa</h2>
          <p><strong>Canal:</strong> {selectedProgram.channel}</p>
          <p><strong>Hora:</strong> {times[selectedProgram.index]}</p>
          <p><strong>Título:</strong> {epg[selectedProgram.channel][selectedProgram.index]}</p>
          <button className="mt-2 px-4 py-2 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400">Recordar</button>
        </div>
      )}

      {selectedStream && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Viendo: {selectedStream.name}</h2>
          <div id="player" className="aspect-video w-full max-w-4xl mx-auto" />
        </div>
      )}

      <script src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js" onLoad={() => {
        if (selectedStream) {
          new window.Clappr.Player({
            source: selectedStream.m3u8,
            parentId: '#player',
            autoPlay: true,
            height: '100%',
            width: '100%',
          });
        }
      }} />
    </div>
  );
}