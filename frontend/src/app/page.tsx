import Layout from '@/components/Layout';
import CanvasLoader from '@/components/CanvasLoader';
import PropertiesPanel from '@/components/PropertiesPanel';

export default function Home() {
  return (
    <Layout rightSidebarContent={<PropertiesPanel />}>
      <CanvasLoader />
    </Layout>
  );
}
