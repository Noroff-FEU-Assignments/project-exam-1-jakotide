let paths = document.querySelectorAll("path");


    document.addEventListener("scroll", drawSvgPaths)

    export function drawSvgPaths() {

        let scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

        for (var i = 0; i < paths.length; i++) {
            let path = paths[i];

            let pathLength = path.getTotalLength();

            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength;

            let drawLength = pathLength * scrollPercentage;

            path.style.strokeDashoffset = pathLength - drawLength;
        }
    }

let gramophonePath = document.querySelectorAll(".gramophone-svgp");

document.addEventListener("scroll", drawSvgPaths);

export function drawGramophone() {
  let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollPosition >= 720) {
    let scrollPercentage = (scrollPosition - 520) / (document.documentElement.scrollHeight - document.documentElement.clientHeight - 520);

    for (var i = 0; i < gramophonePath.length; i++) {
      let gramoPath = gramophonePath[i];

      let gramoPathLength = gramopath.getTotalLength();

      gramoPath.style.strokeDasharray = gramoPathLength;
      gramoPath.style.strokeDashoffset = gramoPathLength;

      let gramoDrawLength = gramoPathLength * scrollPercentage;

      gramoPath.style.strokeDashoffset = gramoPathLength - gramoDrawLength;
    }
  }
}
