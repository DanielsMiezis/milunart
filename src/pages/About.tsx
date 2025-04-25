import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-24">
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="section-title">About</h1>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
              <div className="md:col-span-2">
                <img 
                  src="https://images.pexels.com/photos/3094102/pexels-photo-3094102.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Inguna Miluna" 
                  className="rounded-lg shadow-lg mb-6"
                />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Education</h3>
                    <p>MFA in Fine Arts, Royal Academy of Art</p>
                    <p>BFA in Painting, National Arts University</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Exhibitions</h3>
                    <p>2023 - "Reflections" - Solo Show, Modern Gallery</p>
                    <p>2022 - "Dimensions" - Group Exhibition, Art Space</p>
                    <p>2020 - "New Perspectives" - Biennale, Contemporary Museum</p>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 space-y-6">
                <h2 className="text-2xl font-serif mb-4">Artist Statement</h2>
                <p>
                  My work explores the intersection of memory, emotion, and perception. 
                  I am fascinated by how our internal landscapes shape our experience of the external world, 
                  and how moments of heightened awareness can transform ordinary scenes into profound encounters.
                </p>
                <p>
                  Through my artistic practice, I seek to create visual poetry that resonates with viewers on an 
                  intuitive level, inviting them to pause and reflect on their own relationship with the world around them.
                </p>
                <p>
                  Drawing inspiration from both natural environments and the rich tapestry of human experience, 
                  I work primarily with [medium], though my approach is often experimental and multidisciplinary. 
                  Each piece begins with observation and contemplation, evolving through a process that balances 
                  deliberate intention with spontaneous discovery.
                </p>
                
                <h2 className="text-2xl font-serif mt-8 mb-4">Biography</h2>
                <p>
                  Inguna Miluna was born in [location] and developed an early interest in art through her 
                  childhood explorations of the surrounding landscapes. After completing her formal education,
                  she established her studio practice in [city], where she continues to create and exhibit her work.
                </p>
                <p>
                  Her artwork has been featured in numerous solo and group exhibitions internationally, and is held in 
                  private and public collections throughout Europe and North America. Inguna has received several grants 
                  and awards in recognition of her contribution to contemporary art.
                </p>
                <p>
                  When not in her studio, Inguna can often be found exploring natural environments, collecting visual 
                  reference materials and finding moments of inspiration that later inform her artistic practice.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;