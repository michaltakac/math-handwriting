/* eslint-disable */
import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import Head from '../components/Head';
import fs from 'fs'

import canvasStyles from './canvas.styles.scss';

function transform(linesArray) {
  console.log(linesArray)
  console.log(linesArray[0])
  let strokes = [[]];
  // First stroke
  strokes[0][0] = [linesArray[0].startX, linesArray[0].startY]
  strokes[1] = []
  // other strokes
  console.log(strokes)
  for (let i = 0; i < linesArray.length; i++) {
    strokes[1][i] = [linesArray[i].endX, linesArray[i].endY];
    console.log(strokes)
  }

  var p = 'Drawing has '+ strokes.length +' strokes<br>';
          for (var i = 0; i < strokes.length; ++i) {
            p += '<strong>stroke ' + i + ':</strong> ';
            var stroke = strokes[i];
            for (var j = 0; j < stroke.length; ++j) {
              p += '(' + stroke[j][0] +','+ stroke[j][1] + ')';
            }
            p += '<br>';
          }
          console.log(p)
  return strokes;
};

function strokesToScg(strokes) {
  let scg = 'SCG_INK\n' + strokes.length + '\n'
  strokes.forEach(function (stroke) {
    scg += stroke.length + '\n'
    stroke.forEach(function (p) {
      scg += p[0] + ' ' + p[1] + '\n'
    })
  })

  return scg
};

class Index extends React.Component {
  getDrawing = () => {
    return JSON.parse(this.canvasDraw.getSaveData());
  };

  generateScg = () => {
    const drawing = this.getDrawing();
    const linesArray = drawing.linesArray
    console.log(linesArray)
    if (linesArray.length === 0) return
    console.log("we continue?")
    const scg = strokesToScg(transform(linesArray));
    console.log(scg)
    console.log(fs)
  }

  undo = () => {
    this.canvasDraw.undo();
  };

  clear = () => {
    this.canvasDraw.clear();
  };

  render() {
    return (
      <div>
        <Head title="Home" />
        <div className={canvasStyles.handwriting}>
          <CanvasDraw
            ref={canvasDraw => (this.canvasDraw = canvasDraw)}
            canvasWidth={1200}
            canvasHeight={800}
          />
        </div>
        <button onClick={this.generateScg}>Generate SCGInk</button>
        <button onClick={this.undo}>Undo</button>
        <button onClick={this.clear}>Clear</button>
      </div>
    );
  }
}

export default Index;
