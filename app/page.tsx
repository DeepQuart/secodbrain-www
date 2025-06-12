// "use client";

// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import NavigationBar from "@/components/ui/navigation-bar";

// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.2,
//       type: "spring",
//       bounce: 0.3,
//       duration: 0.8,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function HomePage() {
//   const router = useRouter();

//   return (
//     <>
//       <NavigationBar />

//       <div
//         className="pt-24 min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-500 bg-cover bg-center"
//         style={{ backgroundImage: "url('/bg.png')" }} // Make sure the image is placed inside /public
//       >
//         <motion.div
//           className="text-center max-w-2xl mx-auto px-6 py-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 dark:border-zinc-800"
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//         >
//           <motion.h1
//             className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
//             variants={itemVariants}
//           >
//             Welcome to Second Brain
//           </motion.h1>

//           <motion.p
//             className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
//             variants={itemVariants}
//           >
//             Your personal memory vault and AI-powered assistant to organize and retrieve your thoughts effortlessly.
//           </motion.p>

//           <motion.div className="flex gap-4 justify-center" variants={itemVariants}>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 onClick={() => router.push("/login")}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow"
//               >
//                 Log In
//               </Button>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 onClick={() => router.push("/sign-up")}
//                 variant="outline"
//                 className="px-6 py-3 rounded-full shadow-md hover:border-blue-500"
//               >
//                 Sign Up
//               </Button>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/ui/navigation-bar";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <NavigationBar />

      <div
        className="pt-24 min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-500 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }} // Make sure the image is placed inside /public
      >
        <motion.div
          className="text-center max-w-2xl mx-auto px-6 py-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 dark:border-zinc-800 transition-transform duration-300 ease-in-out hover:scale-105"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-500"
            variants={itemVariants}
          >
            Welcome to Second Brain
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Your personal memory vault and AI-powered assistant to organize and retrieve your thoughts effortlessly.
          </motion.p>

          <motion.div className="flex gap-4 justify-center" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => router.push("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition-all duration-300 ease-in-out"
              >
                Log In
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => router.push("/sign-up")}
                variant="outline"
                className="px-6 py-3 rounded-full shadow-md hover:border-blue-500 transition-all duration-300 ease-in-out"
              >
                Sign Up
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
