import React, { useState, useCallback } from 'react';
import type { Subject, Module, Chapter, Slide } from './courseData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import './styles/DetailView.css';
import { 
  Settings, 
  User, 
  Eye, 
  Edit, 
  Trash2, 
  Save, 
  Download, 
  Upload,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  ExternalLink,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

// Types for the DetailView
interface DetailViewProps {
  selectedItem?: {
    type: 'subject' | 'module' | 'chapter' | 'slide';
    id: string;
    data: Subject | Module | Chapter | Slide;
  } | null;
}

type ViewMode = 'admin' | 'student';

// Sample content data for different slide types
const SAMPLE_CONTENT = {
  pdf: {
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    title: 'Course Overview - Introduction to Python',
    pages: 14,
    size: '2.4 MB'
  },
  video: {
    url: 'https://www.youtube.com/embed/eIrMbAQSU34',
    title: 'The Power of Python - Introduction Video',
    duration: '15:30',
    views: 1542
  },
  document: {
    content: `# Python Documentation - Further Reading

## Introduction to Python Programming

Python is a high-level, interpreted programming language with dynamic semantics. Its high-level built-in data structures, combined with dynamic typing and dynamic binding, make it very attractive for Rapid Application Development.

### Key Features:
- **Easy to Learn**: Python has a simple syntax similar to English
- **Versatile**: Used for web development, data science, automation, and more
- **Large Community**: Extensive libraries and community support
- **Open Source**: Free to use and distribute

### Getting Started:
1. Install Python from python.org
2. Set up your development environment
3. Write your first "Hello, World!" program
4. Explore Python's built-in functions

### Resources:
- Official Python Tutorial: docs.python.org/tutorial
- Python Package Index: pypi.org
- Community Forums: python.org/community

*This document provides additional reading material to supplement your Python learning journey.*`,
    lastUpdated: '2024-01-15',
    readTime: '8 min read'
  },
  assessment: {
    title: 'Initial Python Assessment',
    questions: [
      {
        id: 1,
        question: 'What is Python?',
        type: 'multiple-choice',
        options: [
          'A snake species',
          'A programming language',
          'A web framework',
          'A database system'
        ],
        correct: 1
      },
      {
        id: 2,
        question: 'Which of the following are Python frameworks? (Select all that apply)',
        type: 'multiple-select',
        options: [
          'Django',
          'Flask',
          'React',
          'FastAPI'
        ],
        correct: [0, 1, 3]
      },
      {
        id: 3,
        question: 'Explain the difference between a list and a tuple in Python.',
        type: 'open-ended',
        placeholder: 'Write your answer here...'
      }
    ],
    timeLimit: 30,
    passingScore: 70,
    attempts: 3
  }
};

const DetailView: React.FC<DetailViewProps> = ({ selectedItem }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('student');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  // PDF Viewer State
  const [pdfCurrentPage, setPdfCurrentPage] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(100);

  // Video Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');

  // Assessment State
  const [assessmentAnswers, setAssessmentAnswers] = useState<{[key: number]: any}>({});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    if (selectedItem?.type === 'slide') {
      const slide = selectedItem.data as Slide;
      setEditContent(slide.name);
    }
  }, [selectedItem]);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log('Saving content:', editContent);
  }, [editContent]);

  const handleDelete = useCallback(() => {
    if (confirm('Are you sure you want to delete this item?')) {
      console.log('Deleting item:', selectedItem);
    }
  }, [selectedItem]);

  const renderViewModeToggle = () => (
    <div className="detail-view-header">
      <div className="view-mode-toggle">
        <Button 
          variant={viewMode === 'admin' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('admin')}
          className="rounded-r-none"
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin View
        </Button>
        <Button 
          variant={viewMode === 'student' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('student')}
          className="rounded-l-none"
        >
          <User className="w-4 h-4 mr-2" />
          Student View
        </Button>
      </div>
    </div>
  );

  const renderAdminControls = (slideType: string) => (
    <div className="admin-controls">
      <div className="admin-toolbar">
        <Button size="sm" variant="outline" onClick={handleEdit}>
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button size="sm" variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Replace
        </Button>
        <Button size="sm" variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button size="sm" variant="destructive" onClick={handleDelete}>
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
      <div className="admin-stats">
        <span className="stat-badge">Views: 245</span>
        <span className="stat-badge">Completion: 89%</span>
        <span className="stat-badge">Avg. Time: 5:30</span>
      </div>
    </div>
  );

  const renderPDFViewer = (slide: Slide) => {
    const content = SAMPLE_CONTENT.pdf;
    
    return (
      <div className="pdf-viewer">
        <div className="pdf-header">
          <div className="pdf-info">
            <h3>{content.title}</h3>
            <div className="pdf-meta">
              <span>{content.pages} pages</span>
              <span>{content.size}</span>
            </div>
          </div>
          
          {viewMode === 'admin' && renderAdminControls('pdf')}
        </div>
        
        <div className="pdf-toolbar">
          <div className="pdf-navigation">
            <Button size="sm" variant="outline" onClick={() => setPdfCurrentPage(Math.max(1, pdfCurrentPage - 1))}>
              Previous
            </Button>
            <span className="page-info">
              Page {pdfCurrentPage} of {content.pages}
            </span>
            <Button size="sm" variant="outline" onClick={() => setPdfCurrentPage(Math.min(content.pages, pdfCurrentPage + 1))}>
              Next
            </Button>
          </div>
          
          <div className="pdf-zoom">
            <Button size="sm" variant="outline" onClick={() => setPdfZoom(Math.max(50, pdfZoom - 25))}>
              -
            </Button>
            <span className="zoom-level">{pdfZoom}%</span>
            <Button size="sm" variant="outline" onClick={() => setPdfZoom(Math.min(200, pdfZoom + 25))}>
              +
            </Button>
          </div>
        </div>
        
        <div className="pdf-content">
          <iframe
            src={`${content.url}#page=${pdfCurrentPage}&zoom=${pdfZoom}`}
            width="100%"
            height="600px"
            title={content.title}
            frameBorder="0"
          />
        </div>
      </div>
    );
  };

  const renderVideoPlayer = (slide: Slide) => {
    const content = SAMPLE_CONTENT.video;
    
    return (
      <div className="video-player">
        <div className="video-header">
          <div className="video-info">
            <h3>{content.title}</h3>
            <div className="video-meta">
              <span>{content.duration}</span>
              <span>{content.views} views</span>
            </div>
          </div>
          
          {viewMode === 'admin' && renderAdminControls('video')}
        </div>
        
        <div className="video-content">
          <iframe
            width="100%"
            height="400px"
            src={content.url}
            title={content.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <div className="video-controls">
          <div className="playback-controls">
            <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <span className="current-time">{currentTime} / {content.duration}</span>
          </div>
          
          <div className="video-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '35%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDocumentViewer = (slide: Slide) => {
    const content = SAMPLE_CONTENT.document;
    
    return (
      <div className="document-viewer">
        <div className="document-header">
          <div className="document-info">
            <h3>Further Reading</h3>
            <div className="document-meta">
              <span>{content.readTime}</span>
              <span>Updated: {content.lastUpdated}</span>
            </div>
          </div>
          
          {viewMode === 'admin' && renderAdminControls('document')}
        </div>
        
        <div className="document-content">
          {isEditing && viewMode === 'admin' ? (
            <div className="edit-mode">
              <Textarea
                value={editContent || content.content}
                onChange={(e) => setEditContent(e.target.value)}
                className="edit-textarea"
                rows={20}
              />
              <div className="edit-actions">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="document-prose">
              <pre className="whitespace-pre-wrap font-sans">{content.content}</pre>
            </div>
          )}
        </div>
        
        <div className="document-actions">
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in New Tab
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    );
  };

  const renderAssessment = (slide: Slide) => {
    const content = SAMPLE_CONTENT.assessment;
    
    return (
      <div className="assessment-viewer">
        <div className="assessment-header">
          <div className="assessment-info">
            <h3>{content.title}</h3>
            <div className="assessment-meta">
              <span>Time Limit: {content.timeLimit} minutes</span>
              <span>Passing Score: {content.passingScore}%</span>
              <span>Attempts: {content.attempts}</span>
            </div>
          </div>
          
          {viewMode === 'admin' && renderAdminControls('assessment')}
        </div>
        
        <div className="assessment-content">
          {!assessmentSubmitted ? (
            <div className="assessment-questions">
              {content.questions.map((question, index) => (
                <Card key={question.id} className="question-card">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Question {index + 1}: {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {question.type === 'multiple-choice' && (
                      <div className="options">
                        {question.options?.map((option, optIndex) => (
                          <label key={optIndex} className="option-label">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={optIndex}
                              onChange={(e) => setAssessmentAnswers({
                                ...assessmentAnswers,
                                [question.id]: parseInt(e.target.value)
                              })}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'multiple-select' && (
                      <div className="options">
                        {question.options?.map((option, optIndex) => (
                          <label key={optIndex} className="option-label">
                            <input
                              type="checkbox"
                              value={optIndex}
                              onChange={(e) => {
                                const currentAnswers = assessmentAnswers[question.id] || [];
                                if (e.target.checked) {
                                  setAssessmentAnswers({
                                    ...assessmentAnswers,
                                    [question.id]: [...currentAnswers, optIndex]
                                  });
                                } else {
                                  setAssessmentAnswers({
                                    ...assessmentAnswers,
                                    [question.id]: currentAnswers.filter((a: number) => a !== optIndex)
                                  });
                                }
                              }}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'open-ended' && (
                      <Textarea
                        placeholder={question.placeholder}
                        value={assessmentAnswers[question.id] || ''}
                        onChange={(e) => setAssessmentAnswers({
                          ...assessmentAnswers,
                          [question.id]: e.target.value
                        })}
                        rows={4}
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
              
              <div className="assessment-actions">
                <Button 
                  onClick={() => setAssessmentSubmitted(true)}
                  className="submit-assessment"
                >
                  Submit Assessment
                </Button>
              </div>
            </div>
          ) : (
            <div className="assessment-results">
              <div className="results-header">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <h3>Assessment Completed!</h3>
              </div>
              <div className="results-score">
                <div className="score-circle">
                  <span className="score-number">85%</span>
                  <span className="score-label">Score</span>
                </div>
              </div>
              <div className="results-feedback">
                <p>Great job! You've passed the assessment.</p>
                <p>You can review your answers or retake the assessment if needed.</p>
              </div>
              <div className="results-actions">
                <Button variant="outline" onClick={() => setAssessmentSubmitted(false)}>
                  Review Answers
                </Button>
                <Button>Continue to Next Lesson</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSlideContent = (slide: Slide) => {
    switch (slide.type) {
      case 'pdf':
        return renderPDFViewer(slide);
      case 'video':
        return renderVideoPlayer(slide);
      case 'document':
        return renderDocumentViewer(slide);
      case 'assessment':
        return renderAssessment(slide);
      case 'youtube':
        return renderVideoPlayer(slide);
      case 'text':
      case 'code':
      case 'html':
      default:
        return (
          <div className="default-content">
            <Card>
              <CardHeader>
                <CardTitle>{slide.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Content type: {slide.type}</p>
                <p>This content type will be implemented soon.</p>
                {viewMode === 'admin' && renderAdminControls(slide.type)}
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  const renderNonSlideContent = () => {
    if (!selectedItem) {
      return (
        <div className="empty-state">
          <div className="empty-content">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <h3>Select an item to view details</h3>
            <p>Choose a course, module, chapter, or slide from the explorer to see its content.</p>
          </div>
        </div>
      );
    }

    const { type, data } = selectedItem;
    
    return (
      <div className="info-view">
        <Card>
          <CardHeader>
            <div className="info-header">
              <CardTitle className="capitalize">{type}: {(data as any).name}</CardTitle>
              <span className="type-badge capitalize">{type}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="info-content">
              {type === 'subject' && (
                <div className="subject-info">
                  <p>Course modules: {(data as Subject).modules.length}</p>
                  <p>This course covers fundamental concepts and practical applications.</p>
                </div>
              )}
              
              {type === 'module' && (
                <div className="module-info">
                  <p>Chapters: {(data as Module).chapters.length}</p>
                  <p>This module provides structured learning with hands-on exercises.</p>
                </div>
              )}
              
              {type === 'chapter' && (
                <div className="chapter-info">
                  <p>Slides: {(data as Chapter).slides.length}</p>
                  <p>This chapter includes various learning materials and activities.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="detail-view">
      {renderViewModeToggle()}
      
      <div className="detail-content">
        {selectedItem?.type === 'slide' 
          ? renderSlideContent(selectedItem.data as Slide)
          : renderNonSlideContent()
        }
      </div>
    </div>
  );
};

export default DetailView; 