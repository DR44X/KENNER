import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrado uma única vez conforme especificação da Seção 7
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger };
