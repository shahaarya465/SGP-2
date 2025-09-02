import React, { useState } from "react";

function App() {
  // --- STATE MANAGEMENT ---
  const [pastImage, setPastImage] = useState(null);
  const [recentImage, setRecentImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- API CALL FUNCTION ---
  const handleSubmit = async () => {
    if (!pastImage || !recentImage) {
      alert("Please upload both past and recent images!");
      return;
    }
    setLoading(true);
    setResult(null); // Clear previous results

    const formData = new FormData();
    formData.append("past_image", pastImage);
    formData.append("recent_image", recentImage);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("An error occurred while trying to get the prediction. Please check the console.");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#162013] group/design-root overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* --- MAIN CONTENT (Header is removed) --- */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">🌍 Deforestation Detection Dashboard</p>
            </div>
            
            {/* --- IMAGE UPLOAD SECTION --- */}
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Upload Images</h3>
            
            {/* Past Image Input */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">Past Image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setPastImage(e.target.files?.[0])}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#426039] bg-[#21301c] focus:border-[#426039] h-14 placeholder:text-[#a2c398] p-[15px] text-base font-normal leading-normal file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#54d22d] file:text-[#162013] hover:file:bg-[#54d22d]/80"
                />
                <span className="text-[#a2c398] text-xs pt-1 truncate">{pastImage?.name || "No file chosen"}</span>
              </label>
            </div>
            
            {/* Recent Image Input */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">Recent Image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setRecentImage(e.target.files?.[0])}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#426039] bg-[#21301c] focus:border-[#426039] h-14 placeholder:text-[#a2c398] p-[15px] text-base font-normal leading-normal file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#54d22d] file:text-[#162013] hover:file:bg-[#54d22d]/80"
                />
                <span className="text-[#a2c398] text-xs pt-1 truncate">{recentImage?.name || "No file chosen"}</span>
              </label>
            </div>

            {/* --- SUBMIT BUTTON --- */}
            <div className="flex px-4 py-3 justify-start">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#54d22d] text-[#162013] text-sm font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-green-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                <span className="truncate">
                  {loading ? 'Processing...' : '🚀 Predict Deforestation'}
                </span>
              </button>
            </div>
            
            {/* --- DYNAMIC LOADING MESSAGE --- */}
            {loading && (
              <p className="text-[#a2c398] text-sm font-normal leading-normal pb-3 pt-1 px-4">🔄 Please wait, analyzing images...</p>
            )}

            {/* --- RESULTS SECTION (Conditional) --- */}
            {result && (
              <>
                <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">📊 Prediction Results</h3>
                <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
                  <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#426039] py-5"><p className="text-[#a2c398] text-sm font-normal leading-normal">NDVI Past</p><p className="text-white text-sm font-normal leading-normal">{result.ndvi_past?.toFixed(3) || 'N/A'}</p></div>
                  <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#426039] py-5"><p className="text-[#a2c398] text-sm font-normal leading-normal">NDVI Recent</p><p className="text-white text-sm font-normal leading-normal">{result.ndvi_recent?.toFixed(3) || 'N/A'}</p></div>
                  <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#426039] py-5"><p className="text-[#a2c398] text-sm font-normal leading-normal">Change</p><p className="text-white text-sm font-normal leading-normal">{result.deforestation_change?.toFixed(3) || 'N/A'}</p></div>
                  <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#426039] py-5"><p className="text-[#a2c398] text-sm font-normal leading-normal">Status</p><p className="text-white text-sm font-normal leading-normal">{result.status || 'N/A'}</p></div>
                </div>

                {/* Display Generated Past Image if available */}
                {result.generated_past && (
                  <>
                    <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">🖼️ Generated Optical (Past)</h3>
                    <div className="flex w-full grow bg-[#162013] @container p-4">
                      <div className="w-full gap-1 overflow-hidden bg-[#162013] @[480px]:gap-2 aspect-[3/2] rounded-lg flex">
                        <div
                          className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                          style={{ backgroundImage: `url('data:image/png;base64,${result.generated_past}')` }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Display Generated Recent Image if available */}
                {result.generated_recent && (
                  <>
                    <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">🖼️ Generated Optical (Recent)</h3>
                    <div className="flex w-full grow bg-[#162013] @container p-4">
                      <div className="w-full gap-1 overflow-hidden bg-[#162013] @[480px]:gap-2 aspect-[3/2] rounded-lg flex">
                        <div
                          className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                          style={{ backgroundImage: `url('data:image/png;base64,${result.generated_recent}')` }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;