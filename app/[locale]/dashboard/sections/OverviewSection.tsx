'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Clock, BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import { SectionProps } from '@/types/dashboard';

/**
 * OverviewSection Component
 * Displays statistics and graphics about the user's data and children's activity.
 */
export default function OverviewSection({ t }: SectionProps) {

    // Mock Data for Demo
    const stats = [
        { title: 'Total Messages', value: '1,234', change: '+12%', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-100' },
        { title: 'Active Children', value: '3', change: '0', icon: Users, color: 'text-green-500', bg: 'bg-green-100' },
        { title: 'Avg. Daily Activity', value: '45m', change: '-5%', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-100' },
        { title: 'Insights Generating', value: '28', change: '+2', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-100' },
    ];

    const barData = [65, 45, 78, 32, 90, 56, 43];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('sections.overview')}</h2>
                <span className="text-sm text-gray-500">Last updated: Just now</span>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <h3 className="text-2xl font-bold mt-2 text-gray-800">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className={stat.change.startsWith('+') ? 'text-green-600' : stat.change === '0' ? 'text-gray-600' : 'text-red-600'}>
                                {stat.change}
                            </span>
                            <span className="text-gray-400 ml-2">vs last week</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Activity Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <BarChart3 className="text-blue-500" size={20} />
                            Weekly Activity
                        </h3>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {barData.map((height, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 w-full group">
                                <div className="relative w-full flex items-end justify-center h-52 bg-gray-50 rounded-lg overflow-hidden">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        className="w-full mx-1 bg-blue-500 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-gray-600">
                                        {height}m
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">{days[i]}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Usage Trends Line Plotter (SVG) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <TrendingUp className="text-purple-500" size={20} />
                            Interaction Trends
                        </h3>
                    </div>
                    <div className="h-64 relative flex items-center justify-center">
                        <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* Grid lines */}
                            <line x1="0" y1="0" x2="500" y2="0" stroke="#f3f4f6" strokeWidth="1" />
                            <line x1="0" y1="50" x2="500" y2="50" stroke="#f3f4f6" strokeWidth="1" />
                            <line x1="0" y1="100" x2="500" y2="100" stroke="#f3f4f6" strokeWidth="1" />
                            <line x1="0" y1="150" x2="500" y2="150" stroke="#f3f4f6" strokeWidth="1" />
                            <line x1="0" y1="200" x2="500" y2="200" stroke="#f3f4f6" strokeWidth="1" />

                            {/* The Line */}
                            <motion.path
                                d="M0,150 C50,140 50,100 100,110 S150,180 200,140 S250,50 300,70 S350,120 400,90 S450,20 500,40"
                                fill="none"
                                stroke="#8b5cf6"
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            {/* The Area */}
                            <motion.path
                                d="M0,150 C50,140 50,100 100,110 S150,180 200,140 S250,50 300,70 S350,120 400,90 S450,20 500,40 V200 H0 Z"
                                fill="url(#gradient)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2, delay: 0.5 }}
                            />
                        </svg>
                        <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-400 mt-2">
                            <span>Week 1</span>
                            <span>Week 2</span>
                            <span>Week 3</span>
                            <span>Week 4</span>
                        </div>
                    </div>
                </motion.div>

                {/* Topic Distribution */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 lg:col-span-2"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <PieChart className="text-orange-500" size={20} />
                            Topic Distribution
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { label: 'School & Learning', val: 75, color: 'bg-blue-500' },
                            { label: 'Emotions & Feelings', val: 45, color: 'bg-purple-500' },
                            { label: 'Social & Friends', val: 60, color: 'bg-green-500' },
                            { label: 'Safety & Privacy', val: 90, color: 'bg-orange-500' }
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{item.label}</span>
                                    <span className="text-gray-500">{item.val}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                    <motion.div
                                        className={`h-2.5 rounded-full ${item.color}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.val}%` }}
                                        transition={{ duration: 1, delay: 1 + (idx * 0.2) }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
