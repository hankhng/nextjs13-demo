import React, { Suspense } from "react";

function Home() {
  return (
    // Suspense component will stream in whichever component is ready first without blocking the entire UI from loading
    <>
      <Suspense fallback={<p>Loading component 1</p>}>
        {/* Some API call / component rendering */}
      </Suspense>

      <Suspense fallback={<p>Loading component 2</p>}>
        {/* Some API call / component rendering */}
      </Suspense>
    </>
  );
}

export default Home;
