
import * as motion from "motion/react-client"


export default function TryOurAI() {
  return (
    <section className="max-w-11/12 mx-auto bg-gradient-to-br from-white-100 text-white py-16 px-6 lg:px-20 rounded-2xl shadow-sm my-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-black">
          🚀 Try Our AI Assistant
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Need help with code, learning paths, or debugging? Let our AI assistant guide you with real-time answers tailored for developers.
        </p>
        <a

          className="inline-block bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white text-lg font-medium py-3 px-8 rounded-full shadow-lg hover:scale-105"
        >
          Try it Now
        </a>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700">
            <h3 className="text-xl font-semibold mb-2">💡 Code Suggestions</h3>
            <p className="text-gray-400">
              Get instant suggestions for HTML, CSS, JavaScript, React and more.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700">
            <h3 className="text-xl font-semibold mb-2">📘 Learn Faster</h3>
            <p className="text-gray-400">
              Ask anything about programming concepts, tools, and documentation.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700">
            <h3 className="text-xl font-semibold mb-2">🛠️ Debug Help</h3>
            <p className="text-gray-400">
              Stuck? Paste your code and get explanations, fixes, and tips.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
