import React, { useState } from 'react';
import ThreeColumnLayout from '../components/layout/ThreeColumnLayout';
import CourseExplorer from '../components/course/CourseExplorer';
import DetailView from '../components/course/DetailView';
import ChatView from '../components/chat/ChatView';
import type { Subject, Module, Chapter, Slide } from '../components/course/courseData';

interface SelectedItem {
  type: 'subject' | 'module' | 'chapter' | 'slide';
  id: string;
  data: Subject | Module | Chapter | Slide;
}

const CoursePage = () => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  return (
    <ThreeColumnLayout
      leftPane={<CourseExplorer selectedItem={selectedItem} onItemSelect={setSelectedItem} />}
      middlePane={<DetailView selectedItem={selectedItem} />}
      rightPane={<ChatView />}
    />
  );
};

export default CoursePage; 