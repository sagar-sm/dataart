var font;

window.onload = opentype.load('typefaces/Lato-Hairline.ttf', function (err, _font) {
      if (err) {
          alert('Could not load font: ' + err);
      } else {
          font = _font;
          var s2001 = new p5(sketch);
      }
  });

var textSize = null;


var sketch = function(s) {
  var points, count;
  var fontSize = 450;
  var img;
  var words = [];
  var glyphExtents = [];


  s.setup = function() {
    s.createCanvas(window.innerWidth, window.innerHeight - 50);
    points = font.getPoints(s.drawingContext, '2OO1', 20, fontSize+20, fontSize);
    count = 0;
    console.log(font);
    points.forEach(function(glyph, i){

      glyphExtents.push({
        min: { 
          x: Math.min.apply( Math, glyph.map( function(g){ return g.x; } ) ),
          y: Math.min.apply( Math, glyph.map( function(g){ return g.y; } ) )
        },
        max: {
          x: Math.max.apply( Math, glyph.map( function(g){ return g.x; } ) ),
          y: Math.max.apply( Math, glyph.map( function(g){ return g.y; } ) )
        }
      });

      console.log(glyphExtents);

      glyph.forEach(function(g, j) {
         
        words.push({
          word: tfidf[(i+1)*j].toUpperCase(), 
          x:    g.x,
          y:    g.y
        });
        //words[ tfidf[(i+1)*j].toUpperCase() ] = glyph[j];
        count++;
      });

    });
    img = s.loadImage('s2001.jpeg');
    pt = s.millis();

  };

  s.draw = function() {
    t = s.millis();
    s.background(255);

    s.noStroke();
    
   // s.textFont('helveticaneue');
    s.textSize(textSize || fontSize/14.5);
    // s.stroke(100,100,100);
    s.fill(0);

    s.push();
    words.forEach(function(w){
      s.text(w.word, w.x, w.y);
      // s.ellipse(w.x, w.y, 5, 5);
    });
    s.pop();

    s.fill(121,212,255);
    // font.drawMetrics(s.drawingContext, '2001', 20, fontSize+20, fontSize)

    s.blendMode(s.SCREEN);
    s.image(img, 290, 290, 960,  540);

  };

  s.mousePressed = function(){
    
  }

  function clickedGlyph(glE, mX, mY){

  }
};

function sliderChange(val){
  textSize = val;
}