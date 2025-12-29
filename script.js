function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) return false;
    }
    return true;
}

function showError(txt) {
    let box = document.getElementById("errorBox");
    box.style.display = "block";
    box.innerHTML = txt;
}

function clearError() {
    let box = document.getElementById("errorBox");
    box.style.display = "none";
    box.innerHTML = "";
}

function binarySearchIterative(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

function binarySearchRecursive(arr, target, left, right) {
    if (left > right) return -1;
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
    else return binarySearchRecursive(arr, target, left, mid - 1);
}

function measureTime(fn) {
    let start = performance.now();

    for (let i = 0; i < 100000; i++) {
        fn();

        let a = i * 2;
        a = a / 3;
    }

    let end = performance.now();

    return (end - start) / 100000;
}

function runTest() {
    let rawData = document.getElementById("userData").value.trim();
    let target = parseInt(document.getElementById("target").value);

    if (rawData === "") return showError("Masukkan data terlebih dahulu!");

    let arr = rawData.split(",").map(Number);

    if (arr.length < 2) {
        return showError("Data minimal 2 elemen terurut. Contoh: 1,2,3,4,5");
    }

    if (!isSorted(arr)) {
        return showError("Gagal! Data tidak terurut. Binary Search membutuhkan data terurut.");
    }

    clearError();

    let tIter = measureTime(() => binarySearchIterative(arr, target));
    let tRecur = measureTime(() => binarySearchRecursive(arr, target, 0, arr.length - 1));

    document.getElementById("iterativeResult").innerText =
        `Iteratif: index = ${binarySearchIterative(arr, target)}, waktu = ${tIter.toFixed(6)} ms`;

    document.getElementById("recursiveResult").innerText =
        `Rekursif: index = ${binarySearchRecursive(arr, target, 0, arr.length - 1)}, waktu = ${tRecur.toFixed(6)} ms`;
}

const ctx = document.getElementById("runtimeChart").getContext("2d");

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            { label: 'Iteratif (ms)', borderColor: 'blue', data: [], fill: false },
            { label: 'Rekursif (ms)', borderColor: 'red', data: [], fill: false }
        ]
    }
});

function addToChart() {
    let rawData = document.getElementById("userData").value.trim();

    if (rawData === "") return showError("Masukkan data terlebih dahulu!");

    let arr = rawData.split(",").map(Number);

    if (!isSorted(arr)) {
        return showError("Gagal menambahkan ke grafik! Data tidak terurut.");
    }

    clearError();

    let N = arr.length;

    let tIter = measureTime(() => binarySearchIterative(arr, arr[arr.length - 1]));
    let tRecur = measureTime(() => binarySearchRecursive(arr, arr[arr.length - 1], 0, arr.length - 1));

    chart.data.labels.push(N);
    chart.data.datasets[0].data.push(tIter);
    chart.data.datasets[1].data.push(tRecur);

    chart.update();
}
