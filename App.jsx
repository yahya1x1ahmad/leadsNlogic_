import React, { useState, useEffect } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const [dockerCommandsVisible, setDockerCommandsVisible] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const tools = [
    {
      title: 'Image Generator',
      description: 'Create images with Flux models',
      color: '#e6f7ff',
      dockerCmd: `docker run -it -p 7860:7860 --platform=linux/amd64 \
  -e FLUX_URL="YOUR_VALUE_HERE" \
  -e HF_TOKEN="YOUR_VALUE_HERE" \
  registry.hf.space/nihalgazi-flux-pro-unlimited:latest python app.py`,
    },
    {
      title: 'Image Upscaler',
      description: 'Enhance images to 8K resolution',
      color: '#e6e6fa',
      dockerCmd: 'docker run -it -p 7860:7860 huyai123/Flux.1-dev-Image-Upscaler',
    },
    {
      title: 'Background Remover',
      description: 'Remove backgrounds with precision',
      color: '#ffedcc',
      dockerCmd: `docker run -it -p 7860:7860 --platform=linux/amd64 --gpus all \
  registry.hf.space/not-lain-background-removal:latest python app.py`,
    },
    {
      title: 'Image to Video',
      description: 'Generate short AI videos from prompts',
      color: '#ffe6e6',
      dockerCmd: 'docker run -it -p 7860:7860 Lightricks/LTX-Video',
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-900 dark:text-white">Leads N Logic</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Create. Enhance. Imagine.
          <br />
          AI-powered tools for stunning visuals
        </p>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
          Get Started
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="rounded-lg shadow-md hover:shadow-lg transition-all p-6 cursor-pointer"
              style={{ backgroundColor: tool.color }}
            >
              <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
                {tool.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{tool.description}</p>
              <button className="mt-4 bg-gray-800 text-white hover:bg-gray-700 py-2 px-4 rounded">
                Try Now
              </button>
            </div>
          ))}
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-300 mb-4 md:mb-0">
            © 2025 Leads N Logic. Built with Hugging Face.
          </div>

          <button
            className="text-blue-600 dark:text-blue-400 hover:underline"
            onClick={() => setDockerCommandsVisible(!dockerCommandsVisible)}
          >
            Show Docker Commands
          </button>
        </div>

        {dockerCommandsVisible && (
          <div className="mt-6 p-4 bg-white dark:bg-gray-700 rounded">
            {tools.map((tool, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="text-md font-bold mb-2">{tool.title}</h4>
                <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap">
                  {tool.dockerCmd}
                </pre>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center gap-2">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode:</span>
          <label className="relative inline-block w-12 h-6">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only"
            />
            <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div
              className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                darkMode ? 'translate-x-full' : ''
              }`}
            ></div>
          </label>
        </div>
      </footer>
    </div>
  );
};

export default App;
