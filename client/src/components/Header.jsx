import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiHome, FiMap, FiUser } from 'react-icons/fi';

// Adicionei a prop 'end' aqui no componente
function NavItem({ to, icon: Icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end} // Para consertar o bug
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
          isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'
        }`
      }
      aria-label={label}
    >
      <Icon size={22} />
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
}

export default function Header() {
  return (
    <header className="bg-white shadow-sm w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/app" className="text-2xl font-bold font-tinos" aria-label="Visse">
          Visse<span className="text-orange-500">?</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6" aria-label="Navegação principal">
          {/* Adicionei 'end' apenas no Início */}
          <NavItem to="/app" icon={FiHome} label="Início" end /> 
          <NavItem to="/app/mapa" icon={FiMap} label="Mapa" />
          
          <NavLink
            to="/app/perfil"
            className={({ isActive }) =>
              `w-10 h-10 rounded-full flex items-center justify-center border transition ${
                isActive ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200'
              }`
            }
            aria-label="Perfil"
          >
            <FiUser size={20} />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
