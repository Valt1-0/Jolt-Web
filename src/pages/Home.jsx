import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Home = () => {
  function AnimatedNumber({ value }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let current = 0;
      const target = parseInt(value.replace(/\D/g, ""), 10);
      if (isNaN(target)) return;

      const duration = 1500; // durée animation en ms
      const stepTime = 16; // environ 60fps
      const increment = target / (duration / stepTime);

      function step() {
        current += increment;
        if (current >= target) {
          setCount(target);
        } else {
          setCount(Math.floor(current));
          setTimeout(step, stepTime);
        }
      }

      step();
    }, [value]);

    // Récupère suffixe (ex: "+") et espaces, on remplace juste les chiffres animés
    const suffix = value.replace(/[0-9\s]/g, "");
    const formatted = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return <>{formatted + suffix}</>;
  }

  const stats = [
    { label: "VLEU disponibles", value: "1 200+" },
    { label: "Trajets réalisés", value: "85 000+" },
    { label: "Kg CO₂ économisés", value: "14 320" },
  ];

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="bg-white">
      {/* HERO */}
      <motion.section
        className="flex flex-col lg:flex-row items-center justify-between gap-10 px-6 py-10 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#70E575] leading-tight mb-6">
            Trouve ta trottinette en un clin d'œil
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Localise instantanément les VLEU autour de toi, accède aux
            itinéraires optimisés et démarre ton trajet facilement.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/map"
            className="inline-block bg-[#70E575] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md transition"
          >
            Voir la carte
          </motion.a>
        </div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img
            src="/src/assets/illustrations/scooter.svg"
            alt="Illustration trottinette"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
      </motion.section>
      <img
        src="/src/assets/transitions/wave2.svg"
        alt="Vague"
        className="w-full h-auto"
      />
      {/* FONCTIONNALITÉS */}
      <motion.section
        className="py-8 bg-[#70E575]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Fonctionnalités clés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Localisation en temps réel",
                desc: "Sache à tout moment où sont les trottinettes disponibles autour de toi.",
              },
              {
                title: "Itinéraire optimisé",
                desc: "Obtiens l’itinéraire le plus rapide et écologique selon ta position.",
              },
              {
                title: "Historique des trajets",
                desc: "Consulte tous tes trajets précédents et leur impact écologique.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200/70"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-[#70E575] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <img
        src="/src/assets/transitions/wave1.svg"
        alt="Vague"
        className="w-full h-auto"
      />
      {/* TYPES DE VÉHICULES */}
      <motion.section
        className="py-8 border-t border-gray-200/80 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#70E575] mb-12">
            Quel véhicule préfères-tu ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Trottinette", img: "scooter.svg" },
              { name: "Vélo électrique", img: "bike.svg" },
              { name: "Gyropode", img: "gyropod.svg" },
            ].map((veh, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`/src/assets/illustrations/${veh.img}`}
                  alt={veh.name}
                  className="w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-[#70E575]">
                  {veh.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <img
        src="/src/assets/transitions/wave3.svg"
        alt="Vague"
        className="w-full h-auto -mt-4"
      />

      {/* STATISTIQUES */}
      <motion.section
        className="py-8 bg-[#70E575]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        onViewportEnter={() => setIsVisible(true)} // quand la section entre dans la vue, on active l'anim
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <p className="text-3xl font-extrabold text-[#70E575]">
                <AnimatedNumber value={stat.value} isVisible={isVisible} />
              </p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <img
        src="/src/assets/transitions/wave4.svg"
        alt="Vague"
        className="w-full h-auto"
      />

      {/* TÉMOIGNAGES */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#70E575] mb-12">
            Ce que disent nos utilisateurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sophie L.",
                text: "L'app est super intuitive. J'ai trouvé une trottinette en moins de 2 minutes !",
              },
              {
                name: "Marc D.",
                text: "Parfait pour mes trajets quotidiens en ville. Et en plus, c’est écolo.",
              },
              {
                name: "Amina B.",
                text: "J’adore l’interface et le suivi de mes trajets. Je recommande à 100%.",
              },
            ].map((user, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="text-gray-600 mb-4">"{user.text}"</p>
                <p className="font-semibold text-[#70E575]">{user.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* APPLICATION MOBILE */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-6">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/src/assets/illustrations/mobile_app.svg"
              alt="App mobile"
              className="w-full max-w-sm mx-auto"
            />
          </motion.div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-[#70E575] mb-4">
              Utilise aussi notre app mobile
            </h2>
            <p className="text-gray-600 mb-6">
              Accède aux fonctionnalités VLEU directement depuis ton smartphone.
              Disponible sur Android et iOS.
            </p>
            <a
              href="#"
              className="inline-block bg-[#70E575] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md transition hover:bg-[#5ed363]"
            >
              Télécharger l’app
            </a>
          </div>
        </div>
      </section>
      {/* CTA FINAL */}
      <section className="py-16 bg-[#70E575] text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Prêt à rouler ?</h2>
          <p className="mb-8">
            Lance la carte et trouve ta prochaine trottinette en un instant.
          </p>
          <a
            href="/map"
            className="inline-block bg-white text-[#70E575] px-6 py-3 rounded-full font-semibold text-lg shadow-md transition hover:bg-gray-100"
          >
            Voir la carte
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
