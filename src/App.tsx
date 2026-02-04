import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone,
    CheckCircle,
    Star,
    MapPin,
    Clock,
    Instagram,
    Facebook,
    ThermometerSnowflake,
    Wind,
    ShieldCheck,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';

// --- Configuration & Data ---

const WHATSAPP_NUMBER = "5571999730051"; // International format
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const REVIEWS = [
    {
        name: "Raysa Souza",
        text: "Super recomendo o trabalho da GSA. São profissionais pontuais, cuidadosos e muito educados. Atendimento nota 10!",
        stars: 5,
    },
    {
        name: "Eunice Almeida",
        text: "Atendimento de excelência. Profissional com muito conhecimento técnico, cuidadoso com o ambiente. Super recomendo.",
        stars: 5,
    },
    {
        name: "Lucas Rodrigues",
        text: "Excelente atendimento e serviço de qualidade. Muito satisfeito com a instalação do meu ar condicionado. Porto Seguro agradece o profissionalismo.",
        stars: 5,
    },
    {
        name: "Carla Santos",
        text: "Extremamente profissional! Explicou tudo que seria feito e executou de maneira limpa e organizada. Recomendo com certeza!",
        stars: 5,
    }
];

const SERVICES = [
    {
        icon: <ThermometerSnowflake className="w-8 h-8 text-primary" />,
        title: "Residencial (Split Highwall)",
        description: "Foco em casas e apartamentos. Instalação de aparelhos pequenos com acabamento premium, evitando gotejamentos e barulho excessivo."
    },
    {
        icon: <Wind className="w-8 h-8 text-primary" />,
        title: "Comercial (Piso-Teto/Cassete)",
        description: "Atendimento a lojas, escritórios e consultórios. Equipamentos de maior potência instalados para garantir conforto térmico eficiente."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        title: "Manutenção Preventiva e Corretiva",
        description: "Limpeza profunda com produtos biodegradáveis, verificação de gás e componentes elétricos. Prevenção de quebras e redução no consumo de energia."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        title: "Especialista em Tecnologia Inverter",
        description: "Foco total na economia de energia e conforto silencioso. Dimensionamento correto para evitar desperdício e garantir durabilidade."
    }
];

const DIFFERENTIALS = [
    {
        title: "Instalação dentro das normas técnicas",
        description: "Seguimos rigorosamente os padrões do fabricante e normas técnicas, garantindo segurança, eficiência energética e maior vida útil do equipamento."
    },
    {
        title: "Qualidade que evita retrabalho",
        description: "Uma instalação correta desde o início previne vazamentos, perda de rendimento e consumo excessivo de energia."
    },
    {
        title: "Atendimento profissional",
        description: "Avaliação técnica do ambiente, orientação clara ao cliente e entrega do serviço com responsabilidade e compromisso."
    }
];

const FAQ_ITEMS = [
    {
        question: "Quanto custa uma instalação?",
        answer: "O valor varia de acordo com a capacidade (BTUs), o modelo (Split, Cassete, etc.) e a complexidade do local de instalação. Entre em contato pelo WhatsApp para um orçamento rápido e sem compromisso."
    },
    {
        question: "Realiza higienizações e qual o valor?",
        answer: "Sim! Realizamos higienização completa com produtos específicos que eliminam fungos e bactérias. O valor depende do modelo e quantidade de aparelhos. Fale conosco para uma cotação."
    },
    {
        question: "Vende máquinas?",
        answer: "Sim, além da instalação, também auxiliamos na venda dos equipamentos, indicando as melhores marcas e tecnologias (como Inverter) para sua necessidade."
    },
    {
        question: "Faz reparo em máquinas?",
        answer: "Com certeza. Somos especialistas em diagnóstico e reparo técnico de defeitos, reposição de gás e peças para ar condicionado residencial e comercial."
    }
];

// --- Components ---

const Button = ({ children, className = "", href, ...props }: any) => {
    const baseClass = "inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-300 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-1";
    const variants = {
        primary: "bg-action hover:bg-green-500 focus:ring-green-500",
        secondary: "bg-primary hover:bg-blue-700 focus:ring-blue-700",
    };

    const selectedVariant = props.variant === 'secondary' ? variants.secondary : variants.primary;

    if (href) {
        return (
            <a href={href} className={`${baseClass} ${selectedVariant} ${className}`} {...props}>
                {children}
            </a>
        );
    }
    return (
        <button className={`${baseClass} ${selectedVariant} ${className}`} {...props}>
            {children}
        </button>
    );
};

const SectionHeading = ({ children, subtitle, centered = true }: any) => (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
        {subtitle && (
            <span className="block mb-2 text-sm font-bold uppercase tracking-wider text-primary">
                {subtitle}
            </span>
        )}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            {children}
        </h2>
        <div className={`mt-4 h-1 w-24 bg-action rounded ${centered ? 'mx-auto' : ''}`} />
    </div>
);

// --- Sections ---

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Início', href: '#home' },
        { name: 'Sobre', href: '#sobre' },
        { name: 'Serviços', href: '#servicos' },
        { name: 'Depoimentos', href: '#depoimentos' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="GSA Climatização"
                        className={`object-contain transition-all duration-300 ${isScrolled ? 'h-20' : 'h-32 filter drop-shadow-lg'}`}
                    />
                    <div className="flex flex-col justify-center text-left">
                        <span className={`font-bold text-sm md:text-xl tracking-tight leading-tight max-w-[240px] ${isScrolled ? 'text-blue-900' : 'text-white shadow-black drop-shadow-md'}`}>
                            Refrigeração e Climatização
                        </span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`font-medium hover:text-action transition-colors ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <Button href={WHATSAPP_LINK} target="_blank">
                        <Phone className="w-4 h-4 mr-2" />
                        WhatsApp
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="text-gray-800" /> : <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden p-4 flex flex-col gap-4 border-t"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-800 font-medium py-2 border-b border-gray-100"
                            >
                                {link.name}
                            </a>
                        ))}
                        <Button href={WHATSAPP_LINK} target="_blank" className="w-full justify-center">
                            Falar no WhatsApp
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

const Hero = () => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/og-image.png"
                    alt="Técnico de Ar Condicionado em Lauro de Freitas - GSA"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center md:text-left pt-52 md:pt-44">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>Referência em Lauro de Freitas e Região</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Conforto Térmico e <span className="text-action">Economia</span> para seu Ambiente
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                        Climatização com padrão técnico, foco em eficiência energética e durabilidade do equipamento.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Button href={WHATSAPP_LINK} target="_blank" className="w-full sm:w-auto text-lg px-8 py-4">
                                <Phone className="w-5 h-5 mr-2" />
                                Agendar Visita Agora
                            </Button>
                        </motion.div>
                        <Button variant="secondary" href="#servicos" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 backdrop-blur border border-white/30">
                            Conhecer Serviços
                        </Button>
                    </div>

                    <div className="mt-12 flex items-center gap-4 justify-center md:justify-start text-white/80 text-sm">
                        <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-action" /> Atendimento Rápido
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-action" /> Garantia Garantida
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-action" /> Técnico Credenciado
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const About = () => (
    <section id="sobre" className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 relative">
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                        <img src="/og-image.png" alt="Equipe Técnica GSA Climatização em Lauro de Freitas" className="w-full h-auto object-cover" />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gray-100 rounded-full -z-0 opacity-50" />
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full -z-0 opacity-50" />

                    {/* Social Proof Badge */}
                    <div className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 z-20 animate-bounce-slow">
                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Credenciado</p>
                            <p className="font-bold text-gray-900">CRT/BA</p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <SectionHeading subtitle="Sobre Nós" centered={false}>
                        Experiência que garante o seu <span className="text-primary">conforto</span>
                    </SectionHeading>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        A <strong>GSA Climatização</strong> não é apenas uma empresa de ar condicionado. Somos especialistas em transformar ambientes através do conforto térmico.
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Atuando em Lauro de Freitas e região metropolitana, nos destacamos pelo rigor técnico. Sou Técnico em Climatização formado pelo SENAI. Nosso compromisso é com a durabilidade do seu equipamento e a saúde da sua família ou equipe.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {[
                            "Equipe técnica uniformizada e treinada constantemente.",
                            "Ferramental de ponta e tecnologia digital.",
                            "Limpeza e organização impecáveis durante o serviço.",
                            "Transparência total no orçamento."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <Button href={WHATSAPP_LINK} target="_blank">
                        Falar com Técnico
                    </Button>
                </div>
            </div>
        </div>
    </section>
);

const Differentials = () => (
    <section className="py-20 bg-[#1E3A5F] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <span className="block mb-2 text-sm font-bold uppercase tracking-wider text-accent">Porque escolher a GSA?</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    Nossos Diferenciais
                </h2>
                <div className="mt-4 h-1 w-24 bg-action rounded mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {DIFFERENTIALS.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <div className="w-12 h-12 bg-accent/20 text-accent rounded-lg flex items-center justify-center mb-6 font-bold text-xl">
                            {index + 1}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                        <p className="text-gray-300 leading-relaxed">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const Services = () => (
    <section id="servicos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <SectionHeading subtitle="O Que Fazemos">
                Soluções completas para seu <span className="text-primary">Ar Condicionado</span>
            </SectionHeading>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {SERVICES.map((service, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -10 }}
                        className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const Reviews = () => (
    <section id="depoimentos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <SectionHeading subtitle="Depoimentos">
                O que nossos clientes <span className="text-primary">dizem</span>
            </SectionHeading>

            {/* Google Badge Placeholder */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm">
                    <div className="flex -space-x-2">
                        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">G</span>
                    </div>
                    <div>
                        <div className="flex text-yellow-400 text-sm">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-xs text-gray-500 font-medium">4.9/5.0 em 33 avaliações no Google</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {REVIEWS.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-8 rounded-2xl relative">
                        <div className="absolute top-8 right-8 text-6xl text-gray-200 font-serif leading-none opacity-50">"</div>
                        <div className="flex items-center gap-1 mb-4 text-yellow-400">
                            {[...Array(review.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-gray-700 italic mb-6 relative z-10">
                            "{review.text}"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-500 text-sm">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{review.name}</p>
                                <p className="text-xs text-gray-500">Cliente Verificado</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const HowItWorks = () => (
    <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Como contratar a GSA?</h2>
                <p className="text-blue-200 text-lg">Processo simples, rápido e sem dor de cabeça</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { step: "01", title: "Agende pelo WhatsApp", desc: "Entre em contato e nos conte sua necessidade (instalação, limpeza ou reparo).", icon: <Phone /> },
                    { step: "02", title: "Orçamento & Visita", desc: "Passamos uma prévia ou agendamos uma visita técnica para avaliação precisa.", icon: <CheckCircle /> },
                    { step: "03", title: "Execução Perfeita", desc: "Nossa equipe realiza o serviço com limpeza, pontualidade e garantia.", icon: <Star /> }
                ].map((item, i) => (
                    <div key={i} className="relative group">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all text-center h-full">
                            <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-action rounded-full flex items-center justify-center font-bold text-white shadow-md">
                                {item.step}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="text-blue-100">{item.desc}</p>
                        </div>
                        {i < 2 && (
                            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white/50 z-20">
                                <ChevronRight className="w-8 h-8" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Button href={WHATSAPP_LINK} className="px-10 py-4 text-xl shadow-white/10">
                    Solicitar Orçamento Agora
                </Button>
            </div>
        </div>
    </section>
);



const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <SectionHeading subtitle="Dúvidas Frequentes">
                    Perguntas <span className="text-primary">Comuns</span>
                </SectionHeading>

                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 bg-white text-left focus:outline-none"
                            >
                                <span className="font-bold text-lg text-gray-800">{item.question}</span>
                                <ChevronRight
                                    className={`w-5 h-5 text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-90' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-600 bg-white border-t border-gray-50 leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-gradient-to-br from-gray-900 via-[#111827] to-[#0B1121] text-gray-300 py-20 relative overflow-hidden font-sans border-t border-white/5">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand Column */}
                <div className="lg:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <img
                            src="/logo.png"
                            alt="GSA Climatização"
                            className="h-12 w-auto object-contain brightness-0 invert opacity-90"
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-xl tracking-tight text-white leading-none">GSA</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500 mt-1 font-semibold">Climatização</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-primary/30 pl-4">
                        Transformando ambientes com tecnologia e responsabilidade técnica. Seu conforto é nossa prioridade absoluta.
                    </p>
                    <div className="flex gap-4">
                        {[
                            { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/gsa_climatizacao?igsh=YnM5N2xsdDMzaWll", color: "hover:bg-pink-600 hover:border-pink-600" },
                            { icon: <Facebook className="w-5 h-5" />, href: "#", color: "hover:bg-blue-600 hover:border-blue-600" }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                className={`w-11 h-11 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 hover:text-white ${social.color} hover:scale-105 hover:shadow-lg hover:shadow-white/5`}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        Links Rápidos
                        <div className="h-1 w-12 bg-action rounded-full ml-2 opacity-50" />
                    </h3>
                    <ul className="space-y-3">
                        {['Início', 'Sobre', 'Serviços', 'Depoimentos'].map((item) => (
                            <li key={item}>
                                <a href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-action transition-colors"></span>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        Contato
                        <div className="h-1 w-12 bg-action rounded-full ml-2 opacity-50" />
                    </h3>
                    <ul className="space-y-5">
                        <li className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-action shrink-0 group-hover:bg-action group-hover:text-white transition-colors duration-300">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Endereço</span>
                                <span className="text-sm text-gray-300">Lauro de Freitas - Centro<br />Bahia, Brasil</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-action shrink-0 group-hover:bg-action group-hover:text-white transition-colors duration-300">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Telefone</span>
                                <span className="text-sm text-gray-300 hover:text-action cursor-pointer transition-colors">(71) 99973-0051</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-action shrink-0 group-hover:bg-action group-hover:text-white transition-colors duration-300">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Expediente</span>
                                <span className="text-sm text-gray-300">Seg - Sex: 08h às 18h</span>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Map/Location */}
                <div className="lg:col-span-1">
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        Localização
                        <div className="h-1 w-12 bg-action rounded-full ml-2 opacity-50" />
                    </h3>
                    <div className="rounded-xl overflow-hidden h-56 w-full bg-gray-800 shadow-2xl border border-gray-700 relative group">
                        <iframe
                            src="https://maps.google.com/maps?q=Centro%20Lauro%20de%20Freitas%20Bahia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
                            allowFullScreen
                            loading="lazy"
                            title="Mapa GSA - Centro Lauro de Freitas"
                            className="group-hover:filter-none transition-all duration-700 opacity-80 group-hover:opacity-100"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} GSA Climatização. Todos os direitos reservados.</p>
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                        Desenvolvido com <span className="text-red-500 text-base">♥</span> por <span className="text-white font-bold tracking-wide">AgilizeDev</span>
                    </span>
                </div>
            </div>
        </div>
    </footer >
);

const FloatingWhatsApp = () => (
    <a
        href={WHATSAPP_LINK}
        target="_blank"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 animate-bounce-slow group"
        aria-label="Falar no WhatsApp"
    >
        <span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
            Fale Conosco!
        </span>
        <div className="absolute inset-0 rounded-full border-2 border-white opacity-20 animate-ping"></div>
        <Phone className="w-8 h-8 text-white" />
    </a>
)

const ThankYou = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Obrigado!</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
            Recebemos seu interesse. Em breve um de nossos especialistas entrará em contato pelo WhatsApp.
        </p>
        <Button href="/" variant="secondary">
            Voltar ao Início
        </Button>
    </div>
);

function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => setCurrentPath(window.location.pathname);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    if (currentPath === '/obrigado') {
        return <ThankYou />;
    }

    return (
        <div className="font-sans">
            <Header />
            <main>
                <Hero />
                <About />
                <Differentials />
                <Services />
                <Reviews />
                <HowItWorks />
                <FAQ />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}

export default App;
