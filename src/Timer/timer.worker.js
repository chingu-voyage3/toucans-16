const interval = 1000;
let timeout;
let expected;

const step = () => {
    const dt = Date.now() - expected;
    postMessage("tick");
    expected += interval;
    timeout = setTimeout(step, Math.max(0, interval - dt));
};

onmessage = e => {
    switch (e.data) {
    case "start":
        expected = Date.now() + interval;
        timeout = setTimeout(step, interval);
        break;
    case "pause":
        clearTimeout(timeout);
        break;
    default:
        break;
    }
};
