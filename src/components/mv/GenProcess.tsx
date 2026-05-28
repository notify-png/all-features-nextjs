import { MvConfig } from '@/lib/mv/data'

interface Props {
  cfg: MvConfig
}

export default function GenProcess({ cfg }: Props) {
  const { genre_name: g, color_accent: accent, demo_prompt: demo, category: cat, slug } = cfg

  const preview = demo.length > 58 ? demo.slice(0, 58) + '…' : demo

  let step2Sub = 'Or go One-Click — AI writes the brief'
  if (cat?.includes('Platform') || slug.startsWith('music-video-for-')) {
    step2Sub = 'Pick format, ratio & platform style'
  } else if (cat?.includes('Occasion') || cat?.includes('Viral')) {
    step2Sub = 'Describe the moment — AI writes the story'
  } else if (cat?.includes('Workflow')) {
    step2Sub = 'Paste lyrics, photos, or a text prompt'
  }

  const eqBars = Array.from({ length: 14 }, (_, i) => (
    <div
      key={i}
      className="gp-eq-bar"
      style={{
        animationDelay: `${(i * 0.055).toFixed(2)}s`,
        animationDuration: `${(0.40 + (i % 4) * 0.07).toFixed(2)}s`,
      }}
    />
  ))

  const typewriterScript = `
(function(){
  var t=${JSON.stringify(demo)},i=0,el=document.getElementById('gpText');
  if(!el)return;
  function tick(){if(i<=t.length){el.textContent=t.slice(0,i++)+(i<t.length?'|':'');setTimeout(tick,36);}}
  setTimeout(tick,700);
})();
`

  return (
    <>
      <div className="gen-card">
        <div
          className="gp-badge"
          style={{
            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
            color: accent,
          }}
        >
          {g} Music Video
        </div>

        <div className="gp-step">
          <div className="gp-step-num" style={{ color: accent }}>01</div>
          <div>
            <div className="gp-step-title">Upload your track</div>
            <div className="gp-step-sub">MP3 · WAV · AAC · AIFF · up to 20 MB</div>
            <div className="gp-file">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
              <span id="gpText" className="gp-filename"></span>
            </div>
          </div>
        </div>
        <hr className="gp-divider" />

        <div className="gp-step">
          <div className="gp-step-num" style={{ color: accent }}>02</div>
          <div>
            <div className="gp-step-title">Describe your vision</div>
            <div className="gp-step-sub">{step2Sub}</div>
            <div className="gp-prompt-box" style={{ borderLeftColor: accent }}>
              &ldquo;{preview}&rdquo;
            </div>
          </div>
        </div>
        <hr className="gp-divider" />

        <div className="gp-step">
          <div className="gp-step-num" style={{ color: accent }}>03</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="gp-step-title">Your video is ready</div>
            <div className="gp-step-sub">AI generates in ~90 s · every format included</div>

            <div className="gp-gen">
              <div className="gp-gen-dot" style={{ background: accent }} />
              <div className="gp-gen-label">Generating…</div>
              <div className="gp-prog-track">
                <div className="gp-prog-fill" style={{ background: accent }} />
              </div>
            </div>

            <div className="gp-ready">
              <div
                className="gp-player"
                style={{
                  background: `color-mix(in srgb, ${accent} 8%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${accent} 18%, transparent)`,
                }}
              >
                <div
                  className="gp-play-btn"
                  style={{
                    background: accent,
                    boxShadow: `0 2px 10px color-mix(in srgb, ${accent} 38%, transparent)`,
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
                <div className="gp-eq">{eqBars}</div>
                <div className="gp-time">0:47</div>
              </div>
              <div className="gp-formats">
                <span
                  className="gp-fmt gp-fmt-hi"
                  style={{
                    background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                    color: accent,
                    borderColor: `color-mix(in srgb, ${accent} 22%, transparent)`,
                  }}
                >4K</span>
                <span className="gp-fmt">16:9</span>
                <span className="gp-fmt">9:16</span>
                <span className="gp-fmt">1:1</span>
                <span className="gp-fmt">MP4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script dangerouslySetInnerHTML={{ __html: typewriterScript }} />
    </>
  )
}
