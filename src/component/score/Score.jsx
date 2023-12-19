
export default function Score({ score }) {

    const renderSpans = () => {
      const spans = [];
      for (let i = 0; i < score; i++) {
        spans.push(<span className="star"></span>);
      }
      return spans;
    };
    return(
    <>
      <div className="scoreBox">
        {renderSpans()}
        
      </div>

    </>
  );
}
