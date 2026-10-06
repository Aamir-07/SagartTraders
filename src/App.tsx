import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, type Variants } from 'motion/react'
import {
  ArrowLeft,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  DoorOpen,
  Hammer,
  Layers3,
  Search,
  MapPin,
  Menu,
  MessageCircle,
  PanelsTopLeft,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react'
import './App.css'

const phoneNumber = '918770847424'
const copyrightYear = new Date().getFullYear()
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hello Sagar Traders, I would like to know more about your plywood, hardware and furniture range.')}`
const image = (name: string) => `${import.meta.env.BASE_URL}images/${name}`
const officialLogo = image('sagar-logo.jpeg')

const categories = [
  { name: 'Plywood & boards', icon: Layers3 },
  { name: 'Doors & laminates', icon: DoorOpen },
  { name: 'Furniture', icon: PanelsTopLeft },
  { name: 'Hardware', icon: Hammer },
]

const products = [
  {
    title: 'Plywood & boards',
    type: 'Plywood & boards',
    description: 'A dependable foundation for furniture, interiors and everyday projects.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
    tag: 'Build with confidence',
  },
  {
    title: 'Doors & laminates',
    type: 'Doors & laminates',
    description: 'Explore door styles and surface finishes to give every room its character.',
    image: image('door-display.jpeg'),
    tag: 'Made for your space',
  },
  {
    title: 'Wardrobes & almirahs',
    type: 'Furniture',
    description: 'Thoughtful storage inspiration, from clean lines to warm wood finishes.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=85',
    tag: 'Room to feel at home',
  },
  {
    title: 'Furniture & interiors',
    type: 'Furniture',
    description: 'Materials and ideas for bedrooms, kitchens and comfortable living spaces.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
    tag: 'Find your finish',
  },
  {
    title: 'Furniture hardware',
    type: 'Hardware',
    description: 'The handles, hinges and fittings that bring the small details together.',
    image: image('store-hardware.jpeg'),
    tag: 'Details matter',
  },
  {
    title: 'Adhesives & essentials',
    type: 'Hardware',
    description: 'Useful everyday essentials for carpentry, installation and finishing work.',
    image: image('hardware-display.jpeg'),
    tag: 'Ready for the job',
  },
]

const catalogCategories: {
  id: string
  name: string
  description: string
  image: string
  icon: LucideIcon
}[] = [
  { id: 'accessories', name: 'Accessories', description: 'Browse practical add-ons and finishing essentials.', image: image('hardware-display.jpeg'), icon: Sparkles },
  { id: 'doors', name: 'Doors', description: 'Look through a variety of door finishes and styles.', image: image('door-display.jpeg'), icon: DoorOpen },
  { id: 'furniture', name: 'Furniture', description: 'Explore the furniture collection and interior inspiration.', image: image('showroom.jpeg'), icon: PanelsTopLeft },
]

const catalogPhotos = import.meta.glob<string>(
  './product-images/**/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' },
)

function productPhotoTitle(path: string) {
  const filename = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'Product'
  return filename
    .replace(/^WhatsApp Image \d{4}-\d{2}-\d{2} at \d+\.\d+\.\d+ (?:PM|AM)/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\w/, (letter) => letter.toUpperCase())
}


const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

function ProductListing({ onGoHome }: { onGoHome: () => void }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const items = catalogCategories.flatMap((category) => {
    const matchingPhotos = Object.entries(catalogPhotos).filter(([path]) => {
      const normalizedPath = path.replace(/\\/g, '/')
      return normalizedPath.startsWith(`./product-images/${category.id}/`)
    })

    if (matchingPhotos.length > 0) {
      return matchingPhotos.map(([path, src]) => ({
        id: path,
        category,
        title: productPhotoTitle(path),
        image: src,
        isPreview: false,
      }))
    }

    return [{
      id: category.id,
      category,
      title: category.name,
      image: category.image,
      isPreview: true,
    }]
  })

  const visibleItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category.id === activeCategory
    const matchesSearch = `${item.title} ${item.category.name}`.toLowerCase().includes(searchTerm.trim().toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="catalog-page">
      <section className="catalog-hero">
        <button className="catalog-back" onClick={onGoHome}><ArrowLeft size={14} /> Back to home</button>
        <div className="catalog-hero-copy">
          <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> THE SAGAR TRADERS COLLECTION</div>
          <h1>Find the right<br /><em>materials.</em></h1>
          <p>Browse our categories, explore the showroom gallery and get in touch about what you need for your project.</p>
        </div>
        <motion.img className="catalog-hero-logo" src={officialLogo} alt="Sagar Traders official logo" initial={{ opacity: 0, scale: 0.82, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} />
        <div className="catalog-hero-meta"><span>{catalogCategories.length} categories to explore</span><span>Karond · Bhopal</span></div>
      </section>

      <section className="catalog-content section-pad" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <div><div className="eyebrow"><span className="eyebrow-line" /> BROWSE THE RANGE</div><h2 id="catalog-title">What are you<br />looking for?</h2></div>
          <p>Choose a category or search the complete product gallery from the catalogue.</p>
        </div>

        <div className="catalog-tools">
          <div className="catalog-filters" role="group" aria-label="Filter product categories">
            <button className={activeCategory === 'all' ? 'catalog-filter active' : 'catalog-filter'} onClick={() => setActiveCategory('all')} aria-pressed={activeCategory === 'all'}>All categories</button>
            {catalogCategories.map((category) => (
              <button className={activeCategory === category.id ? 'catalog-filter active' : 'catalog-filter'} key={category.id} onClick={() => setActiveCategory(category.id)} aria-pressed={activeCategory === category.id}>{category.name}</button>
            ))}
          </div>
          <label className="catalog-search"><Search size={17} /><span className="sr-only">Search categories and products</span><input type="search" placeholder="Search the range" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></label>
        </div>

        <div className="catalog-results-label"><span>{searchTerm || activeCategory !== 'all' ? `${visibleItems.length} matching ${visibleItems.length === 1 ? 'result' : 'results'}` : 'Explore by category'}</span><span>Ask us about availability and options</span></div>

        {visibleItems.length > 0 ? (
          <motion.div className="catalog-grid" layout>
            {visibleItems.map((item, index) => {
              const enquiry = `Hello Sagar Traders, I would like to enquire about ${item.isPreview ? item.category.name : item.title}.`
              const itemWhatsapp = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(enquiry)}`
              const CategoryIcon = item.category.icon
              return (
                <motion.article className="catalog-card" key={item.id} layout variants={reveal} initial="hidden" animate="visible" transition={{ delay: index * 0.035 }}>
                  <div className="catalog-card-image"><img src={item.image} alt={item.isPreview ? `${item.category.name} at the Sagar Traders showroom` : item.title} loading="lazy" /><span className="catalog-card-count"><CategoryIcon size={13} /> {item.category.name}</span>{item.isPreview && <span className="catalog-photo-note">SHOWROOM PREVIEW</span>}</div>
                  <div className="catalog-card-info"><div className="catalog-item-category">{item.category.name}</div><h3>{item.isPreview ? `Explore ${item.category.name}` : item.title}</h3><p>{item.isPreview ? item.category.description : 'Ask our team about this item and other options in the collection.'}</p><a href={itemWhatsapp} target="_blank" rel="noreferrer">Ask about this <ArrowUpRight size={15} /></a></div>
                </motion.article>
              )
            })}
          </motion.div>
        ) : (
          <div className="catalog-empty"><Search size={22} /><h3>No matching products</h3><p>Try a different search or category.</p><button className="button button-dark" onClick={() => { setSearchTerm(''); setActiveCategory('all') }}>Show all categories <ArrowRight size={15} /></button></div>
        )}

        <div className="catalog-help"><div><span className="catalog-help-mark"><MessageCircle size={19} /></span><p><strong>Looking for something specific?</strong><small>Ask us about a category or visit the shop to see finishes in person.</small></p></div><a className="button button-dark" href={whatsappLink} target="_blank" rel="noreferrer">Chat with Sagar Traders <ArrowUpRight size={15} /></a></div>
      </section>
    </div>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All products')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showCatalog, setShowCatalog] = useState(() => window.location.hash === '#/products')
  const visibleProducts = activeCategory === 'All products'
    ? products
    : products.filter((product) => product.type === activeCategory)

  useEffect(() => {
    const syncPage = () => setShowCatalog(window.location.hash === '#/products')
    window.addEventListener('hashchange', syncPage)
    window.addEventListener('popstate', syncPage)
    return () => {
      window.removeEventListener('hashchange', syncPage)
      window.removeEventListener('popstate', syncPage)
    }
  }, [])

  const navigateToProducts = (event?: { preventDefault: () => void }) => {
    event?.preventDefault()
    window.history.pushState(null, '', '#/products')
    setShowCatalog(true)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateHome = () => {
    window.history.pushState(null, '', '#/home')
    setShowCatalog(false)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <MotionConfig reducedMotion="user">
      <div className="topline">
        <span><MapPin size={13} /> Karond, Bhopal</span>
        <a href="tel:+918770847424"><Phone size={13} /> 87708 47424</a>
        <span className="topline-note">Your neighbourhood plywood & hardware store</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#/home" aria-label="Sagar Traders home" onClick={(event) => { event.preventDefault(); navigateHome() }}>
          <motion.img className="brand-logo" src={officialLogo} alt="Sagar Traders official logo" initial={{ opacity: 0, scale: 0.82, y: 5 }} animate={{ opacity: 1, scale: 1, y: [0, -2, 0] }} transition={{ opacity: { duration: 0.7 }, scale: { duration: 0.7 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }} whileHover={{ scale: 1.06, rotate: -2 }} />
          <span className="brand-copy"><strong>SAGAR TRADERS</strong><small>PLYWOOD · HARDWARE · HOME</small></span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          {showCatalog ? <>
            <a href="#/home" onClick={(event) => { event.preventDefault(); navigateHome() }}>Home</a>
            <a href="tel:+918770847424" onClick={closeMenu}>Call us</a>
            <a className="nav-cta" href={whatsappLink} target="_blank" rel="noreferrer" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15} /></a>
          </> : <>
            <a href="#collections" onClick={closeMenu}>Collections</a>
            <a href="#/products" onClick={navigateToProducts}>Products <ArrowUpRight size={13} /></a>
            <a href="#about" onClick={closeMenu}>Our story</a>
            <a href="#showroom" onClick={closeMenu}>Visit our store</a>
            <a className="nav-cta" href={whatsappLink} target="_blank" rel="noreferrer" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15} /></a>
          </>}
        </nav>
      </header>

      <AnimatePresence mode="wait" initial={false}>
      {showCatalog ? (
        <motion.main key="catalog" className="catalog-main" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
          <ProductListing onGoHome={navigateHome} />
        </motion.main>
      ) : (
      <motion.main key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
        <section className="hero" id="home">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="eyebrow-line" /> BUILT AROUND YOUR HOME
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08 }}>
              Good spaces<br />start with <em>good</em><br /><span>materials.</span>
            </motion.h1>
            <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.24 }}>
              From the first sheet of plywood to the final fitting, find the materials and know-how to make your space feel like yours.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.34 }}>
              <a className="button button-dark" href="#/products" onClick={navigateToProducts}>Browse products <ArrowRight size={16} /></a>
              <a className="button button-text" href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Chat with us</a>
            </motion.div>
            <motion.div className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <span className="proof-icon"><BadgeCheck size={17} /></span>
              <span><strong>Local people. Helpful advice.</strong><small>Here to help with your next project.</small></span>
            </motion.div>
          </div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
            <img className="hero-image" src={image('showroom.jpeg')} alt="Inside the Sagar Traders showroom in Bhopal" />
            <div className="hero-image-shade" />
            <div className="image-label"><span className="live-dot" /> IN OUR SHOWROOM <span className="label-divider">/</span> KAROND, BHOPAL</div>
            <div className="floating-note"><span className="note-icon"><Sparkles size={19} /></span><span><strong>A little inspiration</strong><small>See finishes up close</small></span><ArrowUpRight size={17} /></div>
            <div className="hero-side-note">MATERIALS FOR THE WAY YOU LIVE <span>— EST. IN BHOPAL</span></div>
          </motion.div>
          <a className="scroll-cue" href="#collections"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </section>

        <section className="ticker" aria-label="What we offer">
          <div className="ticker-track">{[0, 1].map((copy) => <div className="ticker-set" key={copy} aria-hidden={copy === 1}>
            <span>PLYWOOD</span><i /> <span>DOORS</span><i /> <span>FURNITURE</span><i /> <span>HARDWARE</span><i /> <span>HOME PROJECTS</span><i />
          </div>)}</div>
        </section>

        <section className="collections section-pad" id="collections">
          <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
            <div><div className="eyebrow"><span className="eyebrow-line" /> A GOOD PLACE TO BEGIN</div><h2>Everything comes<br />together <em>here.</em></h2></div>
            <p>Whether you’re building, renovating or just collecting ideas, explore a range chosen to help you take the next step.</p>
          </motion.div>

          <div className="filters" role="group" aria-label="Filter products by category">
            {['All products', ...categories.map((category) => category.name)].map((category) => (
              <button className={activeCategory === category ? 'filter-chip active' : 'filter-chip'} key={category} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}>{category}</button>
            ))}
          </div>

          <motion.div className="product-grid" layout>
            {visibleProducts.map((product, index) => (
              <motion.article className="product-card" key={product.title} layout variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} transition={{ delay: index * 0.04 }}>
                <a className="product-image-wrap" href={whatsappLink} target="_blank" rel="noreferrer" aria-label={`Ask us about ${product.title}`}>
                  <img src={product.image} alt={product.title} loading="lazy" />
                  <span className="product-tag">{product.tag}</span>
                  <span className="product-arrow"><ArrowUpRight size={18} /></span>
                </a>
                <div className="product-info"><span className="product-category">{product.type}</span><h3>{product.title}</h3><p>{product.description}</p></div>
              </motion.article>
            ))}
          </motion.div>
          <div className="collections-foot"><span>Need a hand choosing?</span><a href="#/products" onClick={navigateToProducts}>Browse all product categories <ArrowRight size={15} /></a><a href={whatsappLink} target="_blank" rel="noreferrer">Tell us what you’re planning <ArrowRight size={15} /></a></div>
        </section>

        <section className="story section-pad" id="about">
          <motion.div className="story-photo" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
            <img src={image('door-display.jpeg')} alt="Wood-finish door and panel samples at Sagar Traders" loading="lazy" />
            <div className="photo-stamp"><span>GOOD<br />THINGS<br />ARE MADE<br /><em>TOGETHER.</em></span><span className="stamp-star">✳</span></div>
            <span className="photo-caption">A peek inside our Karond showroom</span>
          </motion.div>
          <motion.div className="story-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <div className="eyebrow"><span className="eyebrow-line" /> A LITTLE ABOUT US</div>
            <h2>Your project.<br />Our <em>neighbourhood</em><br />know-how.</h2>
            <p className="story-lead">At Sagar Traders, we believe choosing materials should feel simple, considered and personal.</p>
            <p>We’re a local plywood and hardware shop in Karond, Bhopal. Drop by to explore door finishes, browse fittings and talk through what you have in mind. We’ll help you find a good place to start.</p>
            <div className="story-points">
              <div><span><ShieldCheck size={19} /></span><p><strong>A useful range</strong><small>Everyday essentials, all in one place.</small></p></div>
              <div><span><MessageCircle size={19} /></span><p><strong>Real conversations</strong><small>Ask us your questions, big or small.</small></p></div>
            </div>
            <a className="text-link" href="#showroom">Get directions to our store <ArrowRight size={16} /></a>
          </motion.div>
        </section>

        <section className="showroom section-pad" id="showroom">
          <motion.div className="showroom-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> COME SEE FOR YOURSELF</div><h2>Touch the textures.<br /><em>Find your finish.</em></h2></div>
            <a className="button button-light" href="https://maps.google.com/?q=Shop+no+2,+opposite+Murli+Nagar+HP+Petrol+Pump,+Karond,+Bhopal" target="_blank" rel="noreferrer">Find us on the map <ArrowUpRight size={16} /></a>
          </motion.div>
          <div className="showroom-gallery">
            <motion.figure className="gallery-large" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}><img src={image('storefront.jpeg')} alt="Sagar Traders plywood and hardware shop entrance" loading="lazy" /><figcaption><span>COME ON IN</span><small>Find us in Karond, Bhopal</small></figcaption></motion.figure>
            <motion.figure className="gallery-small" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}><img src={image('store-hardware.jpeg')} alt="Hardware and adhesive selection inside the shop" loading="lazy" /><figcaption><span>THE DETAILS</span><small>Hardware, handles & more</small></figcaption></motion.figure>
            <motion.figure className="gallery-small gallery-logo" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}><img src={image('store-sign.jpeg')} alt="Sagar Traders storefront sign in Karond" loading="lazy" /><figcaption><span>YOUR LOCAL STORE</span><small>Shop 2 · Karond, Bhopal</small></figcaption></motion.figure>
          </div>
          <div className="showroom-address"><MapPin size={18} /><span>Shop no 2, opposite Murli Nagar HP Petrol Pump, Karond, Bhopal</span><a href="https://maps.google.com/?q=Shop+no+2,+opposite+Murli+Nagar+HP+Petrol+Pump,+Karond,+Bhopal" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14} /></a></div>
        </section>

        <section className="visit-strip">
          <div className="visit-icon"><Clock3 size={20} /></div>
          <p><strong>Planning a visit?</strong> Give us a call and we’ll help you find your way.</p>
          <a href="tel:+918770847424">Call 87708 47424 <ArrowRight size={15} /></a>
        </section>

        <section className="contact section-pad" id="contact">
          <motion.div className="contact-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="contact-text"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> LET’S MAKE A START</div><h2>Have something<br />in <em>mind?</em></h2><p>Tell us a little about your project. We’d love to help you figure out what comes next.</p>
              <div className="contact-actions"><a className="button button-light" href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Start a WhatsApp chat <ArrowUpRight size={15} /></a><a className="contact-call" href="tel:+918770847424"><Phone size={16} /> 87708 47424</a></div>
            </div>
            <div className="contact-art" aria-hidden="true"><div className="art-frame"><div className="art-panel panel-one" /><div className="art-panel panel-two" /><div className="art-panel panel-three" /><div className="art-shelf" /><span className="art-knob" /></div><div className="art-plant"><i /><i /><i /><i /><span /></div><span className="art-note">A home takes shape<br />one good choice at a time.</span></div>
          </motion.div>
        </section>
      </motion.main>
      )}
      </AnimatePresence>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#/home" onClick={(event) => { event.preventDefault(); navigateHome() }}><img className="brand-logo" src={officialLogo} alt="Sagar Traders official logo" /><span className="brand-copy"><strong>SAGAR TRADERS</strong><small>PLYWOOD · HARDWARE · HOME</small></span></a>
        <span className="footer-note">Good materials. Better spaces.</span>
        <div className="footer-links"><a href="tel:+918770847424">Call us</a><a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a><a href="https://maps.google.com/?q=Shop+no+2,+opposite+Murli+Nagar+HP+Petrol+Pump,+Karond,+Bhopal" target="_blank" rel="noreferrer">Directions</a></div>
        <span className="copyright">© {copyrightYear} Sagar Traders · Bhopal</span>
      </footer>
      <a className="floating-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Chat with Sagar Traders on WhatsApp"><MessageCircle size={21} /><span>Chat with us</span></a>
    </MotionConfig>
  )
}

export default App