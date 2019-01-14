import React, { Component } from 'react';
import './PanZoom.css';
const sidePx = 600;

class PanZoom extends Component {
  constructor(){
    super();
    this.state = {
      zoomedIn : false,
      dragging : false,
      imgDimensions : {
        w : sidePx,
        h : sidePx
      },
      cursorStartPosition : {
        x: 0,
        y: 0
      },
      panOffset : {
        top: null,
        left: null
      }
    }
  }
  handelZoomIn() {
    //bump image height and width by 3X 
    let tripleSize = sidePx * 3;
    this.setState({
      zoomedIn:true, // toggle zoomedIn State
      imgDimensions: {
        w : tripleSize,
        h : tripleSize
      }
    });
  }
  handleZoomOut(){
    this.setState({
      zoomedIn:false, // toggle zoomedIn State
      imgDimensions: {
        w : sidePx,
        h : sidePx
      },
      // reset our left and top offset to center non-zoomed image
      panOffset : {
        left : sidePx/2,
        top  : sidePx/2
      }
    })
  }
  handleDragStart = (e) => {
    e.preventDefault(); // this prevents default image drag effect in browser
    if (!this.state.zoomedIn) return;
    this.setState({
      dragging:true,
      cursorStartPosition : {
        x : window.event.clientX - e.target.offsetLeft,
        y : window.event.clientY - e.target.offsetTop
      }
    })
  }
  handleUp = () => this.state.zoomedIn && this.setState({dragging:false});  
  
  whileDrag = () => {
    if (this.state.zoomedIn && this.state.dragging) {
      //  determine left px offset with bound
      var scrollLeft =  Math.min(
        window.event.clientX - this.state.cursorStartPosition.x,
        this.state.imgDimensions.w/2
      );
      // determine right bound
      scrollLeft = Math.max(scrollLeft, -1*(sidePx/2));

      // determine top px offset with bound
      var scrollTop =  Math.min(
        window.event.clientY - this.state.cursorStartPosition.y,
        this.state.imgDimensions.h/2
      );
      // determine bottom bound
      scrollTop = Math.max(scrollTop, -1*(sidePx/2));
      
      this.setState({
        panOffset : {
          left : scrollLeft,
          top  : scrollTop
        }
      })
    }
  }
  render() {
    const containerStyle = {
      width:sidePx,
      height : sidePx
    }
    const imgStyle = {
      width : this.state.imgDimensions.w +'px',
      height: this.state.imgDimensions.h + 'px',
      top: this.state.panOffset.top + 'px',
      left: this.state.panOffset.left + 'px'
    }
    // swap in a  higher res image for zoomedIn view 
    let px =  (this.state.zoomedIn) ? sidePx*3 : sidePx ;
    const src = `https://bonobos-prod-s3.imgix.net/products/18158/original/SHIRT_ShortSleeve_ZebraRun_JetBlack_hero1.jpg?h=${px}&w=${px}`
    return (
      <div className="App">
        <div id="container" style={containerStyle}>
          <img id="img"
               className={this.state.zoomedIn && 'zoomedIn'}
               onClick={
                 !this.state.zoomedIn ? 
                   () => this.handelZoomIn() :  () => this.handleZoomOut() 
               }
               onDragStart={this.handleDragStart}
               onMouseUp={this.handleUp}
               onMouseMove={this.whileDrag}  
               style={imgStyle}
               src={src} alt="draggable" />
          <div className="controlls">
            <button
              className="zoomIn"
              disabled={this.state.zoomedIn} 
              onClick={() => this.handelZoomIn()}>
                zoom in
            </button>
            <button 
              className="zoomOut"
              disabled={!this.state.zoomedIn}
              onClick={() => this.handleZoomOut()}>
                zoom out
            </button>
          </div>
        </div>   
      </div>
    );
  }
}

export default PanZoom;
