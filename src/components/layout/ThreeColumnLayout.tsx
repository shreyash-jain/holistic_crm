import React from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import './ThreeColumnLayout.css';

interface ThreeColumnLayoutProps {
  leftPane: React.ReactNode;
  middlePane: React.ReactNode;
  rightPane: React.ReactNode;
}

const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({ leftPane, middlePane, rightPane }) => {
  return (
    <PanelGroup direction="horizontal" className="panel-group">
      <Panel defaultSize={20} minSize={15}>
        <div className="panel-content">
          {leftPane}
        </div>
      </Panel>
      <PanelResizeHandle className="resize-handle" />
      <Panel minSize={30}>
        <div className="panel-content">
          {middlePane}
        </div>
      </Panel>
      <PanelResizeHandle className="resize-handle" />
      <Panel defaultSize={25} minSize={20}>
        <div className="panel-content">
          {rightPane}
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default ThreeColumnLayout; 