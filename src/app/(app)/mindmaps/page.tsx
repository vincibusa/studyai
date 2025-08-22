'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Plus,
  Upload,
  Download,
  Zap,
  Settings,
  Users,
  Triangle,
  Circle,
  Square,
  MoreHorizontal,
  Maximize2
} from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  shape: 'circle' | 'rectangle' | 'triangle';
}

interface Connection {
  from: string;
  to: string;
}

const mockNodes: Node[] = [
  { id: 'concept', x: 400, y: 200, text: 'Concept', color: 'bg-blue-600', shape: 'rectangle' },
  { id: 'category1', x: 250, y: 120, text: 'Category 1', color: 'bg-teal-500', shape: 'circle' },
  { id: 'category2', x: 550, y: 120, text: 'Category 2', color: 'bg-gray-400', shape: 'circle' },
  { id: 'branch1', x: 150, y: 80, text: 'Branch 1', color: 'bg-orange-400', shape: 'circle' },
  { id: 'branch2', x: 350, y: 80, text: 'Branch 2', color: 'bg-orange-400', shape: 'circle' },
  { id: 'subbranch1', x: 100, y: 40, text: 'Sub-branch 1', color: 'bg-green-400', shape: 'circle' },
  { id: 'haw1', x: 300, y: 40, text: 'Haw 1', color: 'bg-yellow-400', shape: 'circle' },
  { id: 'haw2', x: 400, y: 40, text: 'Haw 2', color: 'bg-yellow-400', shape: 'circle' },
  { id: 'cusexery2', x: 50, y: 300, text: 'Cusexery2', color: 'bg-teal-500', shape: 'circle' },
];

const connections: Connection[] = [
  { from: 'concept', to: 'category1' },
  { from: 'concept', to: 'category2' },
  { from: 'category1', to: 'branch1' },
  { from: 'category1', to: 'branch2' },
  { from: 'branch1', to: 'subbranch1' },
  { from: 'branch2', to: 'haw1' },
  { from: 'branch2', to: 'haw2' },
  { from: 'subbranch1', to: 'cusexery2' },
];

export default function MindMapsPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const renderNode = (node: Node) => {
    const isSelected = selectedNode === node.id;
    const baseClasses = `absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
      isSelected ? 'scale-110 shadow-lg' : 'hover:scale-105'
    }`;

    const content = (
      <div className={`${node.color} text-white px-3 py-2 text-sm font-medium`}>
        {node.text}
      </div>
    );

    switch (node.shape) {
      case 'circle':
        return (
          <div
            key={node.id}
            className={`${baseClasses}`}
            style={{ left: node.x, top: node.y }}
            onClick={() => setSelectedNode(node.id)}
          >
            <div className="rounded-full">{content}</div>
          </div>
        );
      case 'rectangle':
        return (
          <div
            key={node.id}
            className={`${baseClasses}`}
            style={{ left: node.x, top: node.y }}
            onClick={() => setSelectedNode(node.id)}
          >
            <div className="rounded-lg">{content}</div>
          </div>
        );
      case 'triangle':
        return (
          <div
            key={node.id}
            className={`${baseClasses}`}
            style={{ left: node.x, top: node.y }}
            onClick={() => setSelectedNode(node.id)}
          >
            <div className="rounded-lg transform rotate-45">{content}</div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderConnection = (connection: Connection, index: number) => {
    const fromNode = mockNodes.find(n => n.id === connection.from);
    const toNode = mockNodes.find(n => n.id === connection.to);
    
    if (!fromNode || !toNode) return null;

    const x1 = fromNode.x;
    const y1 = fromNode.y;
    const x2 = toNode.x;
    const y2 = toNode.y;

    return (
      <line
        key={index}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#e5e7eb"
        strokeWidth="2"
        className="pointer-events-none"
      />
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mind Maps</h1>
          <p className="text-gray-600">Visualize and organize your knowledge</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Khow mind map"
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="glass" className="border-gray-200/50 text-gray-900">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          
          <Button variant="glass" className="border-gray-200/50 text-gray-900">
            Export
          </Button>
          
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New mind map
          </Button>
        </div>
      </motion.div>

      <div className="flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-6">
        {/* Main Canvas */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1"
        >
          <div className="glass-card h-[600px] relative overflow-hidden rounded-2xl backdrop-blur-xl border border-gray-200/30">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm">
              {/* Grid background */}
              <svg className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                {connections.map(renderConnection)}
              </svg>
              
              {/* Nodes */}
              <div className="relative w-full h-full">
                {mockNodes.map(renderNode)}
              </div>

              {/* Toolbar */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 glass-card rounded-lg backdrop-blur-sm border border-gray-200/30 p-2">
                <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900">100 +</Button>
                <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900"><Triangle className="w-4 h-4" /></Button>
                <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900"><Circle className="w-4 h-4" /></Button>
                <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900"><Square className="w-4 h-4" /></Button>
                <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900"><MoreHorizontal className="w-4 h-4" /></Button>
              </div>

              {/* Zoom controls */}
              <div className="absolute bottom-4 right-4 glass-card rounded-lg backdrop-blur-sm border border-gray-200/30 p-2">
                <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="xl:w-80 space-y-6"
        >
          {/* Map Properties */}
          <Card>
            <CardHeader>
              <CardTitle>Map properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">More</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Ormatuda</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">AI-Suggestions</h4>
                <div className="space-y-2">
                  <Badge variant="outline" className="block w-fit">Practives</Badge>
                  <Badge variant="outline" className="block w-fit">Songjuns froms</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Collaboration</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Share with team</span>
                  <div className="w-10 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                  </div>
                </div>
              </div>

              {/* Mini collaboration preview */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">MoLaCegoa</h4>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>Options</span>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Zap className="w-4 h-4 mr-2" />
                Auto-arrange
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Customize theme
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export as PNG
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Share with team
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}