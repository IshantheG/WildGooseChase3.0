"use client";

import { SectionShell } from "@/frontend/layout/section-shell";
import JobsPage from "@/frontend/pages/jobs-list/jobs-page";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "@/frontend/pages/dashboard/dashboard-page";
import ResumeEditor from "./frontend/pages/resume-editor/resume-editor";

function App() {
  return (
    <>
      <SectionShell>
        <Routes>
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/resume-bank" element={<div>Resume Bank</div>}/>
          <Route path="/resume-editor" element={<ResumeEditor/>}/>
        </Routes>
      </SectionShell>
    </>
  );
}

export default App;
