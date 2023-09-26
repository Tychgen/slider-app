interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

async function getCatImages(): Promise<CatImage[]> {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
    const data: CatImage[] = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

let i: number = 0;
let slides: NodeListOf<HTMLDivElement> = document.querySelectorAll('.slide');
let slider: HTMLDivElement | null = document.querySelector('.slider');
const leftButton: HTMLButtonElement | null = document.getElementById('left-button') as HTMLButtonElement;
const playPauseButton: HTMLButtonElement | null = document.getElementById('play-pause-button') as HTMLButtonElement;
const rightButton = document.getElementById('right-button') as HTMLButtonElement;
let pause: boolean = false;

async function displayCatImages() {
  try {
    const catImages: CatImage[] = await getCatImages(); 
    slides.forEach((slide) => {
      if (slider) {
        slider.removeChild(slide);
      }
    });

    catImages.forEach((catImage: CatImage, index: number) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      if (index === 0) {
        slide.classList.add('active');
      }

      const img = document.createElement('img');
      img.src = catImage.url;
      img.alt = `Image ${index + 1}`;

      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = `Image ${index + 1}`;

      slide.appendChild(img);
      slide.appendChild(desc);
      if (slider) {
        slider.appendChild(slide);
      }
    });

    slides = document.querySelectorAll('.slide');
  } catch (error) {
    console.error('Error:', error);
  }
}

displayCatImages();

function updateSlider(direction: 'left' | 'right'): void {
  slides[i].className = 'slide';
  if (direction === 'left') {
    i = (i - 1 + slides.length) % slides.length;
  } else {
    i = (i + 1) % slides.length;
  }
  slides[i].className = 'slide active';
  let Xvalue: number = -160 * i;
  if (slider) {
    slider.style.transform = `translateX(${Xvalue}px)`;
  }
}
