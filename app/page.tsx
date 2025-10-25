'use client'

import { useState } from 'react'
import {
  Youtube,
  Calendar,
  Video,
  TrendingUp,
  Settings,
  Upload,
  Clock,
  Eye,
  ThumbsUp,
  MessageSquare,
  Play,
  Pause,
  BarChart3,
  Sparkles
} from 'lucide-react'
import { format, addDays } from 'date-fns'

interface VideoIdea {
  id: string
  title: string
  description: string
  tags: string[]
  thumbnail: string
  scheduledDate: Date
  status: 'draft' | 'scheduled' | 'published'
}

interface ChannelStats {
  subscribers: number
  views: number
  videos: number
  engagement: number
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'videos' | 'schedule' | 'analytics'>('dashboard')
  const [isAutomationActive, setIsAutomationActive] = useState(false)

  const [stats] = useState<ChannelStats>({
    subscribers: 12500,
    views: 345600,
    videos: 47,
    engagement: 8.4
  })

  const [videos, setVideos] = useState<VideoIdea[]>([
    {
      id: '1',
      title: '10 AI Tools That Will Change Your Life in 2025',
      description: 'Discover the most powerful AI tools for productivity, creativity, and automation',
      tags: ['AI', 'Technology', 'Productivity'],
      thumbnail: '🤖',
      scheduledDate: addDays(new Date(), 1),
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'How to Automate Your YouTube Channel with AI',
      description: 'Complete guide to using AI for content creation, scheduling, and analytics',
      tags: ['YouTube', 'Automation', 'Tutorial'],
      thumbnail: '🎬',
      scheduledDate: addDays(new Date(), 3),
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'The Future of Content Creation: AI vs Humans',
      description: 'Exploring the role of AI in modern content creation and what it means for creators',
      tags: ['AI', 'Content Creation', 'Future'],
      thumbnail: '🚀',
      scheduledDate: addDays(new Date(), 5),
      status: 'draft'
    }
  ])

  const generateNewVideo = () => {
    const titles = [
      'Top 5 ChatGPT Prompts for Content Creators',
      'Building a Passive Income with AI Automation',
      'Why AI Will Make You a Better Creator',
      'The Ultimate Guide to AI Video Editing',
      'Creating Viral Content with AI in 2025'
    ]

    const randomTitle = titles[Math.floor(Math.random() * titles.length)]

    const newVideo: VideoIdea = {
      id: Date.now().toString(),
      title: randomTitle,
      description: 'AI-generated video content optimized for maximum engagement',
      tags: ['AI', 'Tutorial', 'Technology'],
      thumbnail: '✨',
      scheduledDate: addDays(new Date(), videos.length + 1),
      status: 'draft'
    }

    setVideos([...videos, newVideo])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Youtube className="w-8 h-8 text-red-600" />
              <h1 className="text-2xl font-bold text-gray-900">YouTube Automation Studio</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAutomationActive(!isAutomationActive)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isAutomationActive
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isAutomationActive ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                <span>{isAutomationActive ? 'Active' : 'Paused'}</span>
              </button>
              <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'videos', label: 'Videos', icon: Video },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Subscribers</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.subscribers.toLocaleString()}</p>
                  </div>
                  <Eye className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-sm text-green-600 mt-2">+12% this month</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.views.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-sm text-green-600 mt-2">+23% this month</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Videos</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.videos}</p>
                  </div>
                  <Video className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-sm text-green-600 mt-2">+3 this week</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Engagement</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.engagement}%</p>
                  </div>
                  <ThumbsUp className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm text-green-600 mt-2">+1.2% this month</p>
              </div>
            </div>

            {/* Automation Status */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Content Engine</h3>
                  <p className="text-purple-100">
                    {isAutomationActive
                      ? 'Automatically generating and scheduling content for your channel'
                      : 'Automation paused - Click "Active" to resume'}
                  </p>
                </div>
                <Sparkles className="w-12 h-12" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={generateNewVideo}
                  className="flex items-center space-x-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                >
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Generate Video Idea</p>
                    <p className="text-sm text-gray-600">AI-powered content</p>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <Upload className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Upload Video</p>
                    <p className="text-sm text-gray-600">Manual upload</p>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                  <Calendar className="w-6 h-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">View Schedule</p>
                    <p className="text-sm text-gray-600">Manage calendar</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Video Library</h2>
              <button
                onClick={generateNewVideo}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate New Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {videos.map((video) => (
                <div key={video.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {video.thumbnail}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{video.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {video.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          video.status === 'published' ? 'bg-green-100 text-green-700' :
                          video.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{format(video.scheduledDate, 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Content Schedule</h2>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="space-y-4">
                {videos.filter(v => v.status === 'scheduled').map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl">
                        {video.thumbnail}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{video.title}</h4>
                        <p className="text-sm text-gray-600">{format(video.scheduledDate, 'EEEE, MMMM d, yyyy \'at\' h:mm a')}</p>
                      </div>
                    </div>
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Channel Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Videos</h3>
                <div className="space-y-3">
                  {[
                    { title: 'AI Tools Guide', views: 45200, likes: 3400 },
                    { title: 'Automation Tutorial', views: 38900, likes: 2800 },
                    { title: 'Content Creation Tips', views: 32100, likes: 2200 }
                  ].map((video, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{video.title}</span>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{(video.views / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{(video.likes / 1000).toFixed(1)}K</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Engagement Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Average Watch Time</span>
                      <span className="font-semibold text-gray-900">6:42</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Click-Through Rate</span>
                      <span className="font-semibold text-gray-900">9.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Subscriber Conversion</span>
                      <span className="font-semibold text-gray-900">4.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
