import { MathJax } from "better-react-mathjax";
import { Def, Media } from "../../default-view/description-utils";

type DescriptionProps = {
  ti: number;
}
export function Description(props: DescriptionProps) {
  const ti = props.ti + 1;
  const intervalDef = <MathJax>A set of all the real numbers between two specific numbers. A closed interval contains all the numbers including the "edge" numbers, and an open interval contains all the numbers except for the "edge" numbers. For example, all the numbers from {`\\(3\\)`} to  {`\\(6\\)`} including {`\\(3\\)`} and {`\\(6\\)`} make a closed interval, and such an interval is written as {`\\([3, 6]\\)`}.  All the numbers from {`\\(3\\)`} to  {`\\(6\\)`} except for {`\\(3\\)`} and {`\\(6\\)`} are an open interval written as {`\\((3, 6)\\)`}. There are also half-open intervals, for example {`\\([3, 6)\\)`} this will contain {`\\(3\\)`}, {`\\(4.789\\)`} and {`\\(5.999....\\)`}, but not {`\\(6\\)`}.</MathJax>
  return (
    <MathJax>
      <p>
        Before we move onto more complicated fractals, let's look at the simplest one: the depiction of Cantor set. It was described even earlier than Sierpinski triangle, in 1874 Georg Cantor, so also before the idea of a fractal existed.
      </p>
      <h2>How to make a Cantor set</h2>
      <p>Let's consider all the numbers between {`\\(0\\)`} and {`\\(1\\)`}, including {`\\(0\\)`} and {`\\(1\\)`}. The set of all those number is symbolised by the line segment on the top of the image. Now, like in the Sierpinski triangle, we'll "cut out" the middle - in this case the middle third of the set. What we're left are numbers from {`\\(0\\)`} to {`\\(\\frac{1}{3}\\)`}, and numbers from {`\\(\\frac{2}{3}\\)`} to {`\\(1\\)`} (the middle <Def phrase="interval" definitionObject={intervalDef} tabIndex={ti}/> that gets removed is always be open, so the ones that are left are closed). In the image, they are depicted as two line segments they we have left after removing the middle third of the first segment.</p>
      <p>Then, we remove the middle thirds of the remaining sets of numbers (or line segments in the image), and do the same thing infinite times. The numbers that we have left after those operations make what is called Cantor set.</p>
      <p>What could be the examples of those numbers? The most obvious ones are 0 and 1. Let's think about the interval on the very left: it starts as {`\\([0, 1]\\)`}, after iteration becomes {`\\([0, \\frac{1}{3}]\\)`}, then {`\\([0, \\frac{1}{9}]\\)`}, {`\\([0, \\frac{1}{27}]\\)`} etc. - but the zero is always there. But exactly the same thing happens to every number that becomes and endpoint at any stage: once we've ended up with {`\\([\\frac{2}{9}, \\frac{1}{3}]\\)`}, we know that {`\\(\\frac{2}{9}\\)`} and {`\\(\\frac{1}{3}\\)`} will survive all the iterations.</p>
      <p className="ex">Use the slider (or number input) to add more iterations. You can also switch to hiding all the intermediate steps just to see the final effect of the selected number of iterations.</p>
      <h2>Some interesting properties of the Cantor set</h2>
      <p>Each time infinity gets involved in a mathematical problem (and with fractals it always lurks somewhere in the background), things get a bit counter-intuitive. So, of course, Cantor set has a few strange property.</p>
      <p>How many numbers are there in the Cantor set? Let's see: there is infinite number of real numbers between {`\\(0\\)`} and {`\\(1\\)`}. Then, we perform and infinite number of operations where we remove a third of what we have left. So, we take some numbers away, but always leave {`\\(\\frac{2}{3}\\)`} of the previous leftover set. We could make a series to calculate it, but that's not very easy or very helpful. But let's think about it from the different perspective - with every iteration we get new endpoints, and we know those endpoints are in the final set. And we have an infinite number of iteration, so we have an infinite number of the endpoints alone! (And these are not the only numbers proven to be in the Cantor set). OK, so we know the Cantor set is infinite without making difficult calculations.</p>
      <p>Let's get back to the line segments in the image - if you add up all the "leftovers" from an infinite number of iterations, what will be the sum of all the lengths of the sub-segments? 0. Just like Sierpinski triangle has the area of 0, because this is what you get after cutting an infinite number of holes in a triangle, the length of Cantor set is 0 after cutting out an infinite number of middle thirds. All while having an infinite numbers of numbers in it.</p>
      <h2>Fractal dimension</h2>
      <p>If you think that having the length of 0 and an infinite number of elements left after removing numbers from an infinite set is strange, wait 'till you hear about fractional dimensions!</p>
      <p>It would seem that a shape must have a natural number of dimensions: a line segment has one dimension, a square has two dimensions, and a cube has three dimensions. It seems that something having {`\\(0.6942\\)`} dimension doesn't make any sense.</p>
      <p>Let's think about scaling figures with a natural number of dimensions by {`\\(2\\)`}. If we have a line segment that has 1 cm, and want to make it quite as large (2cm), we need to put two of those line segments side by side. If we have a square with a 1 cm side, to make a square with 2cm side we need to put four 1cm squares. If we want to make a 2 cm cube out of 1cm cube, we need eight of them.</p>
      <Media src={require('./images/dimensions.png')} alt="A segment, a square and a cube placed above segments, squares and cubes needed to be put together to double the initial size of the object." tabIndex={ti}/>
      <p>In other words, we need to put {`\\(2^1\\)`} segments, {`\\(2^2\\)`} squares, and {`\\(2^3\\)`} cubes to make a shape of double the base size unit. The same happens if we want to triple the size: to make a 3cm-side square out of 1cm squares, we need {`\\(3^2\\)`} small squares. The power we use for scaling is the same as the number of dimensions of our shape.</p>
      <p>Now, let's try scaling a Cantor set. Because it involves a lot of dividing by three, it will be the easiest to triple it - instead of starting with the segment {`\\([0, 1]\\)`}, we are starting with {`\\([0, 3]\\)`}. After removing the middle third, we're left with {`\\([0, 1]\\)`} ( our original starting point), and {`\\([2, 3]\\)`} - another segment that has exactly the same size as our starting point. When we keep removing the next middle thirds, we end up with two Cantor sets. So, when we tripled the initial length our set became twice as large.</p>
      <p>Let's back to tripling the size of a square: we needed {`\\(1cm\\times3^2 \\)`} (or {`\\(9\\)`} ) 1cm-side squares to make a 3cm-side square. With a Cantor set, we need {`\\(2\\)`} or {`\\(1\\times3^d \\)`} Cantor sets to make a Cantor set three times as large, where {`\\(d\\)`} is the number of dimensions. So to find the number of dimensions, we need to solve the equation {`\\(3^d = 2\\)`}, which gives us  {`\\(d = \\frac{log(2)}{log(3)}\\)`}, or {`\\(d≈0.63093\\)`}.
    </p>
    <p>It's not just the Cantor set that has that strange dimension: let's try doubling Sierpinski triangle. If we want a Sierpinski triangle of double the size, we need to put three Sierpinski triangles together, which means that for Sierpinski triangle {`\\(2^d = 3\\)`}, therefore {`\\(d = \\frac{log(3)}{log(2)}\\)`}, or {`\\(d≈1.5850\\)`}. All fractals have dimensions of this kind.</p>
    <Media src={require("./images/fractal-dimensions.png")} alt="An illustration of tripling the size of a square, a Cantor set, and doubling of a Sierpinski triangle" tabIndex={ti} />
    <h2>Cantor dust</h2>
    <p>We can follow a similar process to building a Cantor set by starting from a square instead of a line segment. From each square, we remove a horizontal and a vertical stripe from the middle, whose width is {`\\(\\frac{1}{3}\\)`} of the side of the square. </p>
    <p className="ex"> Switch to the option "2 dimensions - Cantor dust". You can also adjust the number of iterations you see.</p>
    <p>Out of each square, there are four smaller squares left after each iteration. When we follow the process infinite number of time, the points we have left create Cantor dust.</p>
    </MathJax>
  );
}