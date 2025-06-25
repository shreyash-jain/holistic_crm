import React, { useState, useMemo } from 'react';
import { courseData } from './courseData';
import type { Subject, Module, Chapter, Slide } from './courseData';
import { TreeItem } from './TreeItem';
import { SearchIcon } from '../common/icons/icons';
import './styles/CourseExplorer.css';

interface SelectedItem {
  type: 'subject' | 'module' | 'chapter' | 'slide';
  id: string;
  data: Subject | Module | Chapter | Slide;
}

interface CourseExplorerProps {
  selectedItem?: SelectedItem | null;
  onItemSelect?: (item: SelectedItem | null) => void;
}

  const CourseExplorer: React.FC<CourseExplorerProps> = ({ selectedItem: externalSelectedItem, onItemSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [internalSelectedItem, setInternalSelectedItem] = useState<SelectedItem | null>(null);
  const [expandAll, setExpandAll] = useState(true);
  
  // Use external selected item if provided, otherwise use internal state
  const selectedItem = externalSelectedItem || internalSelectedItem;

  // Calculate total slides and progress
  const courseStats = useMemo(() => {
    let totalSlides = 0;
    let totalModules = 0;
    let totalChapters = 0;

    courseData.forEach(subject => {
      totalModules += subject.modules.length;
      subject.modules.forEach(module => {
        totalChapters += module.chapters.length;
        module.chapters.forEach(chapter => {
          totalSlides += chapter.slides.length;
        });
      });
    });

    return { totalSlides, totalModules, totalChapters };
  }, []);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return courseData;

    const searchLower = searchTerm.toLowerCase();
    
    return courseData.map(subject => {
      const filteredModules = subject.modules.map(module => {
        const filteredChapters = module.chapters.map(chapter => {
          const filteredSlides = chapter.slides.filter(slide =>
            slide.name.toLowerCase().includes(searchLower) ||
            slide.type.toLowerCase().includes(searchLower)
          );

          if (
            filteredSlides.length > 0 ||
            chapter.name.toLowerCase().includes(searchLower)
          ) {
            return { ...chapter, slides: filteredSlides };
          }
          return null;
        }).filter(Boolean) as Chapter[];

        if (
          filteredChapters.length > 0 ||
          module.name.toLowerCase().includes(searchLower)
        ) {
          return { ...module, chapters: filteredChapters };
        }
        return null;
      }).filter(Boolean) as Module[];

      if (
        filteredModules.length > 0 ||
        subject.name.toLowerCase().includes(searchLower)
      ) {
        return { ...subject, modules: filteredModules };
      }
      return null;
    }).filter(Boolean) as Subject[];
  }, [searchTerm]);

  const handleItemSelect = (type: SelectedItem['type'], id: string, data: any) => {
    const item = { type, id, data };
    setInternalSelectedItem(item);
    onItemSelect?.(item);
    console.log('Selected:', item);
  };

  const getSlideCount = (chapters: Chapter[]) => {
    return chapters.reduce((total, chapter) => total + chapter.slides.length, 0);
  };

  const getCompletedSlides = (chapters: Chapter[]) => {
    // Mock completion data - in a real app, this would come from user progress
    return Math.floor(getSlideCount(chapters) * 0.6); // 60% completion
  };

  const renderEmpty = () => (
    <div className="course-explorer-empty">
      <div className="course-explorer-empty-icon">
        <SearchIcon />
      </div>
      <p className="course-explorer-empty-text">
        {searchTerm ? 'No courses found matching your search.' : 'No courses available.'}
      </p>
    </div>
  );

  if (filteredData.length === 0) {
    return (
             <div className="course-explorer">
         <div className="course-explorer-header">
           <div className="course-explorer-header-content">
             <h3 className="course-explorer-title">Course Explorer</h3>
             <p className="course-explorer-subtitle">Browse and search courses</p>
           </div>
           <button 
             className="expand-toggle-btn"
             onClick={() => setExpandAll(!expandAll)}
             title={expandAll ? 'Collapse All' : 'Expand All'}
           >
             {expandAll ? 'Collapse' : 'Expand'}
           </button>
         </div>
        
        <div className="course-explorer-search">
          <div className="search-input-wrapper">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search courses, modules, or slides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="course-explorer-content">
          {renderEmpty()}
        </div>
      </div>
    );
  }

  return (
    <div className="course-explorer">
      <div className="course-explorer-header">
        <div className="course-explorer-header-content">
          <h3 className="course-explorer-title">Course Explorer</h3>
                   <p className="course-explorer-subtitle">
           {courseStats.totalModules} modules • {courseStats.totalChapters} chapters • {courseStats.totalSlides} slides
         </p>
        </div>
        <button 
          className="expand-toggle-btn"
          onClick={() => setExpandAll(!expandAll)}
          title={expandAll ? 'Collapse All' : 'Expand All'}
        >
          {expandAll ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      <div className="course-explorer-search">
        <div className="search-input-wrapper">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search courses, modules, or slides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

             <div className="course-explorer-content">
         {filteredData.flatMap((subject: Subject) => 
           subject.modules.map((module: Module) => {
             const slideCount = getSlideCount(module.chapters);
             const completedSlides = getCompletedSlides(module.chapters);
             
             return (
               <TreeItem 
                 key={module.id} 
                 label={module.name} 
                 isFolder 
                 level={0}
                 itemType="module"
                 slideCount={slideCount}
                 completedSlides={completedSlides}
                 isSelected={selectedItem?.type === 'module' && selectedItem.id === module.id}
                 onSelect={() => handleItemSelect('module', module.id, module)}
                 forceExpanded={expandAll}
               >
                 {module.chapters.map((chapter: Chapter) => (
                   <TreeItem 
                     key={chapter.id} 
                     label={chapter.name} 
                     isFolder 
                     level={1}
                     itemType="chapter"
                     slideCount={chapter.slides.length}
                     isSelected={selectedItem?.type === 'chapter' && selectedItem.id === chapter.id}
                     onSelect={() => handleItemSelect('chapter', chapter.id, chapter)}
                     forceExpanded={expandAll}
                   >
                     {chapter.slides.map((slide) => (
                       <TreeItem 
                         key={slide.id} 
                         label={slide.name} 
                         level={2} 
                         slide={slide}
                         itemType="slide"
                         isSelected={selectedItem?.type === 'slide' && selectedItem.id === slide.id}
                         onSelect={() => handleItemSelect('slide', slide.id, slide)}
                       />
                     ))}
                   </TreeItem>
                 ))}
               </TreeItem>
             );
           })
         )}
       </div>
    </div>
  );
};

export default CourseExplorer; 