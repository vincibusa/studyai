import { redirect } from 'next/navigation';

export default function WorkspacePage() {
  // Redirect to a sample workspace
  redirect('/workspace/sample-lesson');
}