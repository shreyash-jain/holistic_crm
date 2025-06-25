import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send,
  Sparkles,
  BookOpen,
  FileText,
  Video,
  PenTool,
  Lightbulb,
  Clock,
  Users,
  Target,
  Zap,
  Bot,
  User as UserIcon,
  Copy,
  RefreshCw
} from 'lucide-react';
import './styles/ChatView.css';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: 'course' | 'module' | 'assessment' | 'content';
  icon: React.ReactNode;
}

const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'basic-course',
    title: 'Create Basic Course',
    description: 'Generate a complete course structure with modules and lessons',
    prompt: 'Create a comprehensive course about [TOPIC] for [BEGINNER/INTERMEDIATE/ADVANCED] level learners. Include:\n- Course overview and objectives\n- 4-6 modules with detailed descriptions\n- Learning outcomes for each module\n- Estimated duration\n- Prerequisites',
    category: 'course',
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    id: 'interactive-content',
    title: 'Interactive Content',
    description: 'Generate engaging interactive lessons and activities',
    prompt: 'Create interactive content for [TOPIC] that includes:\n- Hands-on exercises and practical examples\n- Code challenges or real-world scenarios\n- Interactive quizzes and assessments\n- Visual aids and diagrams\n- Progressive difficulty levels',
    category: 'content',
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: 'assessment-generator',
    title: 'Assessment Generator',
    description: 'Create comprehensive assessments and quizzes',
    prompt: 'Generate a comprehensive assessment for [TOPIC] including:\n- 10 multiple choice questions\n- 5 short answer questions\n- 2 practical exercises\n- Answer key with explanations\n- Difficulty progression from basic to advanced',
    category: 'assessment',
    icon: <PenTool className="w-4 h-4" />
  },
  {
    id: 'video-script',
    title: 'Video Script',
    description: 'Generate engaging video lesson scripts',
    prompt: 'Create a detailed video script for [TOPIC] that includes:\n- Engaging hook and introduction\n- Clear learning objectives\n- Step-by-step explanations with examples\n- Visual cues and demonstrations\n- Summary and call-to-action\n- Estimated duration: [TIME]',
    category: 'content',
    icon: <Video className="w-4 h-4" />
  }
];

const EXAMPLE_PROMPTS = [
  "Create a Python programming course for complete beginners with hands-on projects",
  "Generate an advanced React course focusing on performance optimization and best practices",
  "Design a cybersecurity fundamentals course with practical labs and real-world scenarios",
  "Create a data science course using Python, including machine learning basics"
];

const ChatView = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "👋 Hi! I'm your AI Course Assistant. I can help you create comprehensive courses, interactive content, assessments, and learning materials. \n\nWhat kind of course would you like to create today?",
      timestamp: new Date(),
      status: 'sent'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateMockResponse(userMessage.content),
        timestamp: new Date(),
        status: 'sent'
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const generateMockResponse = (userPrompt: string): string => {
    return `🎯 **Course Generation Plan**

Based on your request: "${userPrompt}"

I'll create a comprehensive course structure with the following components:

📚 **Course Overview**
- Target audience analysis
- Learning objectives and outcomes
- Prerequisites and requirements
- Estimated completion time

🏗️ **Module Structure**
- Module 1: Introduction and Fundamentals
- Module 2: Core Concepts and Theory
- Module 3: Practical Applications
- Module 4: Advanced Topics
- Module 5: Projects and Assessment

📋 **Content Types**
- Video lessons with interactive elements
- Hands-on exercises and coding challenges
- Downloadable resources and cheat sheets
- Quizzes and knowledge checks
- Final capstone project

⚡ **Next Steps**
I can now generate specific content for any module or create detailed assessments. What would you like me to focus on first?`;
  };

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template.id);
    setPrompt(template.prompt);
    textareaRef.current?.focus();
  };

  const handleExampleSelect = (example: string) => {
    setPrompt(example);
    textareaRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateResponse = (messageId: string) => {
    // Implementation for regenerating AI responses
    console.log('Regenerating response for message:', messageId);
  };

  return (
    <div className="ai-chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <div className="header-icon">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="header-text">
            <h3>AI Course Generator</h3>
            <p>Create comprehensive courses with AI assistance</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <BookOpen className="w-4 h-4" />
            <span>Courses: 0</span>
          </div>
          <div className="stat-item">
            <Users className="w-4 h-4" />
            <span>Active</span>
          </div>
        </div>
      </div>

      {/* Template Suggestions */}
      {messages.length <= 1 && (
        <div className="template-section">
          <h4>Quick Start Templates</h4>
          <div className="template-grid">
            {PROMPT_TEMPLATES.map((template) => (
              <Card 
                key={template.id}
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardHeader className="template-header">
                  <div className="template-icon">
                    {template.icon}
                  </div>
                  <CardTitle className="template-title">{template.title}</CardTitle>
                </CardHeader>
                <CardContent className="template-content">
                  <p>{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="example-prompts">
            <h5>Example Prompts</h5>
            <div className="example-list">
              {EXAMPLE_PROMPTS.map((example, index) => (
                <button
                  key={index}
                  className="example-prompt"
                  onClick={() => handleExampleSelect(example)}
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>{example}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">
              {message.type === 'ai' ? (
                <Bot className="w-5 h-5" />
              ) : (
                <UserIcon className="w-5 h-5" />
              )}
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-sender">
                  {message.type === 'ai' ? 'AI Assistant' : 'You'}
                </span>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="message-text">
                <pre className="message-pre">{message.content}</pre>
              </div>
              {message.type === 'ai' && (
                <div className="message-actions">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(message.content)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => regenerateResponse(message.id)}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message ai">
            <div className="message-avatar">
              <Bot className="w-5 h-5" />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <div className="input-container">
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Describe the course you want to create... (e.g., 'Create a beginner Python course with hands-on projects')"
            className="chat-textarea"
            rows={3}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!prompt.trim() || isLoading}
            className="send-button"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="input-footer">
          <div className="input-tips">
            <Target className="w-4 h-4" />
            <span>Be specific about your target audience, topic, and desired learning outcomes</span>
          </div>
          <div className="character-count">
            {prompt.length}/2000
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView; 