'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const buttonscrlto =document.querySelector('.btn--scroll-to')
const section1 =document.querySelector('#section--1');
const tabs =document.querySelectorAll('.operations__tab');
const tabcontainer =document.querySelector('.operations__tab-container');
const tabscontent =document.querySelectorAll('.operations__content');
const nav =document.querySelector('.nav');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn =>btn.addEventListener('click', openModal)
);

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



buttonscrlto.addEventListener('click',function(e){
   section1.scrollIntoView({behavior:'smooth'});
});

//page navigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
    
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   });
// });

//1. Add Event to common parent element

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  //matching stratergy 
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});

//Tblated consept


// tabs.forEach(t=>t.addEventListener('click',()=>console.log('TAB')))

tabcontainer.addEventListener('click',function(e){
  e.preventDefault();
  const clicked =e.target.closest('.operations__tab');
  if(!clicked) return;
  tabs.forEach(t=>t.classList.remove('operations__tab--active'))

  tabscontent.forEach(c=>c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  //Activate the content area

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

})

// Menu Fade animation

const handHover =function(e){
  if(e.target.classList.contains('nav__link')){
    const link =e.target;
    const siblings =link.closest('.nav').querySelectorAll('.nav__link');
    const logo =link.closest('.nav').querySelector('img');
    siblings.forEach(el=>{
      if(el !== link) el.style.opacity=this
    });
    logo.style.opacity=this
  }
}

nav.addEventListener('mouseover',handHover.bind(0.5))
nav.addEventListener('mouseout',handHover.bind(1))


//sticky event 

// const initialcoords = section1.getBoundingClientRect()
// console.log(initialcoords);

// window.addEventListener('scroll',function(){
//   console.log(window.scrollY);
//   if(window.scrollY>initialcoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky');
// });





// const obscallback=function(entries,observer){
//   entries.forEach(entry=>{
//     console.log(entry);
//   })

// };
// const obsoptions={
//   root:null,
//   threshold:0.1,
// };
// const observer =new IntersectionObserver(obscallback,obsoptions)
// observer.observe(section1);

const header =document.querySelector('.header');
const naveheight =nav.getBoundingClientRect().height;
const stickyNav=function(entries){
  const[entry]=entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerobserver =new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`-${naveheight}px`,
});

headerobserver.observe(header);


//reveailthe section
const allsection =document.querySelectorAll('.section')

const revealsection =function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionobserver =new IntersectionObserver(revealsection,{
  root:null,
  threshold:0.15
});

allsection.forEach(function(section){
  sectionobserver.observe(section);
  // section.classList.add('section--hidden');
})

//lazy landing images

const imgtarget =document.querySelectorAll('img[data-src]');
const loading =function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting) return;
  entry.target.src =entry.target.dataset.src;
 

  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target);
};
const imgobserver =new IntersectionObserver(loading,{
  root:null,
  threshold:0,
  rootMargin:'-200px'
});

imgtarget.forEach(img=>imgobserver.observe(img))


const slides =document.querySelectorAll('.slide')
const btnleft =document.querySelector('.slider__btn--left');
const btnright =document.querySelector('.slider__btn--right');
const dotcontainer =document.querySelector('.dots');

let curslide =0;
const maxslide =slides.length;



// const slider= document.querySelector('.slider')
// slider.style.transform='scale(0.4) translateX(-800px)'
// slider.style.overflow ='visible'
//next slide


const creatdots = function(){
  slides.forEach(function(_,i){
    dotcontainer.insertAdjacentHTML('beforeend',`<button class="dots__dot data-slide="${i}"></button>`)
  })
}
creatdots();

// const activatedot =function(slide){
//   document.querySelectorAll('.dots__dot').forEach(dot =>dot.classList.remove('dots__dot--active'));

//   document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
// }
// activatedot(0);

const gotoslide =function(slide){
  slides.forEach(
    (s,i)=>(s.style.transform =`translateX(${100*(i-slide)}%)`));
}
gotoslide(0);

const nextslide =function(){
  if(curslide===maxslide-1){
    curslide =0;
  }
  else{
    curslide++;
  }
  gotoslide(curslide)
  activatedot(curslide);
}
const prevslide =function(){
  if(curslide===0){
    curslide =maxslide-1;
  }
  else{
    curslide--;
  }
  gotoslide(curslide)
  activatedot(curslide);
}
// const init =function(){
//   gotoslide(0)
// }
//ebent handlers
btnright.addEventListener('click',nextslide)
btnleft.addEventListener('click',prevslide)

document.addEventListener('keydown',function(e){
  if(e.key ==='ArrowLeft') prevslide();
  e.key ==='ArrowRight' && nextslide();
});

dotcontainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
  const  {slide}  = e.target.dataset;
  gotoslide(slide);
  activatedot(slide);
  }
})
// window.addEventListener('')


// console.log(document.head);
// console.log(document.body);
// document.querySelector()

// const allbuttons =document.getElementsByTagName('button');
// console.log(allbuttons);

// const allsection=document.querySelectorAll('.section');
// console.log(allsection);

// console.log(document.getElementsByClassName('btn'));




//creating and inserting a element

// const message =document.createElement("div");
// message.classList.add('cookie-message')
// message.textContent='We use cookied for improved functionality and analytics';
// message.innerHTML ='We use cookied for improved functionality and analytics';

// Headers.prepend(message);
// message.style.width='120%'

// document.documentElement.style.setProperty('--color-primary','red');

// const logo = document.querySelector('.nav_logo');
// console.log(logo.alt);
// console.log(logo.src);


// const buttonn =document.querySelector('nav__link');
// const section2 =document.getElementById('section--2');

// buttonscrlto.addEventListener('click',function(){
//   const scrooldown =section2.getBoundingClientRect();
//   window.scrollTo(scrooldown.left,scrooldown.right);
// })

// const h1 =document.querySelector('h1');

// const hialert = function(e){
//     alert('addeventlistner:great you are reading the heading:d');
//     h1.removeEventListener('mouseenter',hialert)
// };
// h1.addEventListener('mouseenter',hialert)


// setTimeout(() => h1,removeEventListener('mouseenter',hialert), 3000);


// h1.onmouseenter =function(e){
//   alert ('onmouseenter:great!you are reading the heading:D');
// }


// const randomint =(min,max)=>Math.floor(Math.random()*(max-min+1)+min);
// const randomcolor = ()=>`rgb(${randomint(0,255)},${randomint(0,255)},${randomint(0,255)})`
// console.log(randomcolor(0,255));

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor =randomcolor();
//   console.log('Link',e.target);
// });

// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor =randomcolor();
//   console.log('Link',e.target,e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor =randomcolor();
//   console.log('Link',e.target,e.currentTarget);
// });
/*
const h1 = document.querySelector('h1');

console.log(h1.querySelectorAll('.highlight'));
h1.firstElementChild.style.color='white';
h1.lastElementChild.style.color='orangered';

h1.closest('.header').style.background='var(--gradient-secondary)';
*/


// const person =function(name,birthyear){
//  this.name =name;
//  this.birthyear=birthyear;

//  this.calcage =funcction(){
//   console.log(2037-this.birthyear);
//  };
// }

// const aslam =new person('aslam',2005);
// console.log(aslam);


// const musthaffa =new person('musthaffa',2004);
// console.log(musthaffa,aslam);

// console.log(person.prototype);

// console.log(aslamm instanceof person);
// person.__proto__.calcage=function(){
//   console.log(2037-this.birthyear);
// };



// aslam.calcage();
// musthaffa.calcage();
// console.log(musthaffa,aslam);

// console.log(aslam.__proto__ === person.prototype);
// console.log(person.prototype.isPrototypeOf(aslam));


// .prototype

// person.prototype.species='Aslam Sapines';
// console.log(aslam,musthaffa)
// console.log(aslam.hasOwnProperty('name'));
// console.log(person.prototype.constructor)


// console.log(aslam.__proto__);
// console.log(aslam.__proto__.__proto__);

// console.log(aslam.__proto__.__proto__.__proto__);

// const arr=[1,2,3,4,2,3,4,5,6,7,8];
// console.log(arr.__proto__);
// Array.prototype.unique=function(){
//   return[...new Set(this)]
// }
// console.log(arr.unique());


// const h1 =document.querySelector('h1');

//class expression

// const personcl=class{}


//class declaration


// class personcl{
//   constructor(firstname,birthyear){
//     this.firstname=firstname;
//     this.birthyear=birthyear;
// }
  //methods with added to prototype
//   calcage(){
//     console.log(2024-this.birthyear)
//   }
//   greet(){
//     console.log(`hey${this.firstname}`);
//   }
// }
// const aslam =new personcl('aslam',2005);
// console.log(aslam);
// aslam.calcage();
// aslam.greet();
// console.log(new personcl ('aslam',19))

// const personel ={
//   calcage(){
//     console.log(2024-this.birthyear);
//   },
//    init(name,birthyear){
//     this.name=name;
//     this.birthyear=birthyear
//   }
// }
// const steven =Object.create(personel)
// steven.init('aslam',2005);
// steven.calcage();

// console.log(steven.__proto__ ===personel)

// const person =function(firstname,birthyear){
//   this.firstname=firstname;
//   this.birthyear=birthyear;
// };
// person.prototype.calcage = function(){
//   console.log(2037-this.birthyear);
// }
// const student =function(firstname,birthyear,course){
  // this.firstname=firstname;
  // this.birthyear=birthyear;
  // person.call(this,firstname ,birthyear);
  // this.course=course;
// }
//linkinng prototype
// student.prototype= Object.create(person.prototype)


// student.prototype.introduce =function(){
//   console.log(`My Name is ${this.firstname} and I study ${this.course}`)
// }
// const aslam =new student('Aslam',2005,'aids')
// console.log(aslam);
// aslam.introduce()

// aslam.introduce();
// aslam.calcage();

// class student extend personcl{
// super()
// }


// const personproto ={
//   calcage(){
//     console,log(2037-this.birthyear);
//},
//   init(firstname,birthyear){
//     this.firstname=firstname;
//     this.birthyear=birthyear;
//   }
// };
// const steven = object.create(personproto)

class account {
  constructor(owner,currency,pin){
    this.owner=owner;
  }
}

//properties