'use client';

import { useState } from 'react';
import { CodeBlock } from './code-block';

interface PackageManagerTabsProps {
  installCommand: string;
  uninstallCommand?: string;
}

const packageManagers = [
  { id: 'pnpm', name: 'pnpm' },
  { id: 'npm', name: 'npm' },
  { id: 'yarn', name: 'yarn' },
  { id: 'bun', name: 'bun' },
];

function convertCommand(command: string, packageManager: string): string {
  // Remove existing package manager prefixes
  const cleanCommand = command
    .replace(/^(npm|yarn|pnpm|bun)\s+/, '')
    .trim();

  // Handle different command types
  if (cleanCommand.startsWith('install ') || cleanCommand.startsWith('i ')) {
    const packages = cleanCommand.replace(/^(install|i)\s+/, '');
    
    switch (packageManager) {
      case 'npm':
        return `npm install ${packages}`;
      case 'yarn':
        return `yarn add ${packages}`;
      case 'pnpm':
        return `pnpm add ${packages}`;
      case 'bun':
        return `bun add ${packages}`;
      default:
        return command;
    }
  }
  
  if (cleanCommand.startsWith('uninstall ') || cleanCommand.startsWith('remove ') || cleanCommand.startsWith('rm ')) {
    const packages = cleanCommand.replace(/^(uninstall|remove|rm)\s+/, '');
    
    switch (packageManager) {
      case 'npm':
        return `npm uninstall ${packages}`;
      case 'yarn':
        return `yarn remove ${packages}`;
      case 'pnpm':
        return `pnpm remove ${packages}`;
      case 'bun':
        return `bun remove ${packages}`;
      default:
        return command;
    }
  }

  // For other commands, just replace the package manager
  switch (packageManager) {
    case 'npm':
      return `npm ${cleanCommand}`;
    case 'yarn':
      return `yarn ${cleanCommand}`;
    case 'pnpm':
      return `pnpm ${cleanCommand}`;
    case 'bun':
      return `bun ${cleanCommand}`;
    default:
      return command;
  }
}

export function PackageManagerTabs({ installCommand, uninstallCommand }: PackageManagerTabsProps) {
  const [activeTab, setActiveTab] = useState('pnpm');

  const commands = [installCommand, uninstallCommand].filter(Boolean);
  const convertedCommands = commands.map(cmd => convertCommand(cmd!, activeTab)).join('\n\n');

  return (
    <div className="mb-4">
      {/* Tab Headers */}
      <div className="flex gap-2 rounded-t-lg mb-1">
        {packageManagers.map((pm) => (
          <button
            key={pm.id}
            onClick={() => setActiveTab(pm.id)}
            className={`px-4 cursor-pointer rounded-md py-2 text-sm font-medium transition-colors ${
              activeTab === pm.id
                ? 'text-white bg-gray-700'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
            }`}
          >
            {pm.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        <CodeBlock className="language-bash">
          {convertedCommands}
        </CodeBlock>
      </div>
    </div>
  );
} 