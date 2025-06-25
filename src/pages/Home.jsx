import TaskManager from '../components/TaskManager';
import ApiData from '../components/ApiData';

const Home = () => {
  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">PLP Task Manager</h1>
        <TaskManager />
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">API Data</h2>
        <ApiData />
      </section>
    </div>
  );
};

export default Home;
