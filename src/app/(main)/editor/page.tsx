import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = { title: "Edit your resume" };

export default function Page() {
  return <ResumeEditor />;
}
