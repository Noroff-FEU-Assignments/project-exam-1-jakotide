// let paths = document.querySelectorAll("path");


//     document.addEventListener("scroll", drawSvgPaths)

//     export function drawSvgPaths() {

//         let scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

//         for (var i = 0; i < paths.length; i++) {
//             let path = paths[i];

//             let pathLength = path.getTotalLength();

//             path.style.strokeDasharray = pathLength;
//             path.style.strokeDashoffset = pathLength;

//             let drawLength = pathLength * scrollPercentage;

//             path.style.strokeDashoffset = pathLength - drawLength;
//         }
//     }

let paths = document.querySelectorAll("path");

document.addEventListener("scroll", drawSvgPaths);

export function drawSvgPaths() {
  let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollPosition >= 1200) {
    let scrollPercentage = (scrollPosition - 1200) / (document.documentElement.scrollHeight - document.documentElement.clientHeight - 1200);

    for (var i = 0; i < paths.length; i++) {
      let path = paths[i];

      let pathLength = path.getTotalLength();

      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;

      let drawLength = pathLength * scrollPercentage;

      path.style.strokeDashoffset = pathLength - drawLength;
    }
  }
}
