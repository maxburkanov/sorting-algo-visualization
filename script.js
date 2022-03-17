const main = document.querySelector('main');
const controllers = document.querySelector('#controller');
const size = document.querySelector('#size');
const speed = document.querySelector('#speed');
const start = document.querySelector('#start');
const startOver = document.querySelector('#start-over');

function buildBars(size) {
    for (let i = 0; i < size; i++) {
        const div = document.createElement('div');
        div.style.height = `${Math.floor(Math.random() * 500) + 10}px`;
        div.classList.add('bar');
        if (size <= 200) {
            div.style.width = '10px';
        }
        if (size < 31) {
            div.style.width = '30px';
        }
        main.appendChild(div);
    }
}

async function bubble(time) {
    const bars = document.querySelectorAll('.bar');

    for (let i = bars.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (j + 1) {
                bars[j].style.background = '#7B4EFD';
                bars[j + 1].style.background = 'blue';

                if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                    // nothing but just an async fn that slows iteration
                    // (takes delay time and sits there does nothing until time finishes, hits brakes)
                    await timeSloweringFn(time);

                    bars[j].style.background = 'blue';
                    bars[j + 1].style.background = '#7B4EFD';

                    const temp = bars[j].style.height;
                    bars[j].style.height = bars[j + 1].style.height;
                    bars[j + 1].style.height = temp;
                }

                bars[j].style.background = 'lightblue';
                bars[j + 1].style.background = 'lightblue';
            }
        }
        bars[i].style.background = 'green';
    }
    bars[0].style.background = 'green';
}

// nothing but just an async function that takes some time
function timeSloweringFn(milisec) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milisec);
    });
}

size.addEventListener('change', (e) => {
    console.log('size', e.target.value);
    main.innerHTML = ``;
    buildBars(e.target.value);
});

startOver.addEventListener('click', () => {
    main.innerHTML = ``;
    start.disabled = false;
    size.disabled = false;
    speed.disabled = false;
    buildBars(size.value);
});

start.addEventListener('click', async () => {
    start.disabled = true;
    size.disabled = true;
    speed.disabled = true;

    await bubble(speed.value);

    start.disabled = false;
    size.disabled = false;
    speed.disabled = false;
});

buildBars(size.value);
