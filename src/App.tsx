import { useState } from 'react';
import { cultures, getRecommendedLayout } from './recommendation';
import type { CultureId, FlagId, Kind, TableShape } from './recommendation';
import { languages, translations } from './i18n';
import type { LanguageId } from './i18n';

function ObjectPaths({kind, active}:{kind:Kind;active:boolean}) {
  const common={fill:'none',stroke:active?'#ededed':'#999',strokeWidth:2.2,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  return <g>
    {kind==='plate'&&<><circle cx="32" cy="32" r="25" {...common}/><circle cx="32" cy="32" r="19" {...common}/></>}
    {kind==='bowl'&&<><path d="M8 26h48c-2 17-11 27-24 27S10 43 8 26Z" {...common}/><path d="M12 32h40" {...common}/></>}
    {kind==='cup'&&<><path d="M12 19h34v24a11 11 0 0 1-11 11h-8a15 15 0 0 1-15-15Z" {...common}/><path d="M46 24h5a8 8 0 0 1 0 16h-5M20 14v-4m12 4V8m12 6v-4" {...common}/></>}
    {kind==='fork'&&<><path d="M32 25v31M22 8v12m7-12v12m7-12v12m7-12v12c0 8-4 12-11 12s-11-4-11-12" {...common}/></>}
    {kind==='knife'&&<><path d="M30 8c-8 9-11 21-7 29 2 4 5 5 9 5V8Zm2 34v14" {...common}/></>}
    {kind==='spoon'&&<><path d="M32 34v22" {...common}/><ellipse cx="32" cy="20" rx="11" ry="15" {...common}/></>}
    {kind==='chopsticks'&&<><path d="m20 8 13 48M38 8 29 56" {...common}/></>}
    {kind==='napkin'&&<><path d="M11 14h42v36H11z" {...common}/><path d="m11 14 21 18 21-18M32 32v18" {...common}/></>}
    {kind==='tray'&&<><rect x="5" y="8" width="54" height="48" rx="5" {...common}/><path d="M32 8v48M5 32h54" {...common}/></>}
    {kind==='hotpot'&&<><circle cx="32" cy="32" r="27" {...common}/><circle cx="32" cy="32" r="22" {...common}/><path d="M32 10v44M10 32h44" {...common}/></>}
    {kind==='leaf'&&<><path d="M7 14Q32 5 57 14q8 18 0 36-25 9-50 0-8-18 0-36Z" {...common}/><path d="M7 32h50M20 12q8 20 0 40m24-40q-8 20 0 40" {...common}/><circle cx="18" cy="23" r="4" {...common}/><circle cx="31" cy="22" r="4" {...common}/><circle cx="46" cy="23" r="4" {...common}/><ellipse cx="32" cy="41" rx="10" ry="5" {...common}/></>}
    {kind==='side-dish'&&<><circle cx="32" cy="32" r="25" {...common}/><circle cx="32" cy="32" r="14" {...common}/><circle cx="28" cy="28" r="4" {...common}/><circle cx="37" cy="35" r="5" {...common}/></>}
    {kind==='shared-round'&&<><circle cx="32" cy="32" r="29" {...common}/><ellipse cx="19" cy="22" rx="7" ry="5" {...common}/><ellipse cx="39" cy="18" rx="6" ry="4" {...common}/><ellipse cx="43" cy="39" rx="7" ry="5" {...common}/><ellipse cx="25" cy="43" rx="6" ry="4" {...common}/></>}
    {kind==='platter'&&<><rect x="3" y="12" width="58" height="40" rx="7" {...common}/><path d="M4 32h56" {...common}/><ellipse cx="14" cy="22" rx="6" ry="4" {...common}/><ellipse cx="27" cy="22" rx="6" ry="4" {...common}/><ellipse cx="41" cy="22" rx="6" ry="4" {...common}/><ellipse cx="53" cy="22" rx="5" ry="4" {...common}/><ellipse cx="14" cy="42" rx="6" ry="4" {...common}/><ellipse cx="27" cy="42" rx="6" ry="4" {...common}/><ellipse cx="41" cy="42" rx="6" ry="4" {...common}/><ellipse cx="53" cy="42" rx="5" ry="4" {...common}/></>}
    {kind==='buffet'&&<><rect x="4" y="14" width="56" height="36" rx="5" {...common}/><path d="M4 32h56" {...common}/><rect x="10" y="19" width="11" height="8" rx="2" {...common}/><rect x="26" y="19" width="12" height="8" rx="2" {...common}/><rect x="43" y="19" width="11" height="8" rx="2" {...common}/><rect x="10" y="37" width="11" height="8" rx="2" {...common}/><rect x="26" y="37" width="12" height="8" rx="2" {...common}/><rect x="43" y="37" width="11" height="8" rx="2" {...common}/></>}
    {kind==='tiered-stand'&&<><ellipse cx="32" cy="52" rx="21" ry="5" {...common}/><path d="M32 10v40M12 37h40M18 24h28" {...common}/><circle cx="32" cy="11" r="5" {...common}/><rect x="15" y="30" width="11" height="6" rx="2" {...common}/><rect x="27" y="30" width="11" height="6" rx="2" {...common}/><rect x="39" y="30" width="10" height="6" rx="2" {...common}/><rect x="10" y="40" width="11" height="6" rx="2" {...common}/><rect x="27" y="40" width="11" height="6" rx="2" {...common}/><rect x="43" y="40" width="11" height="6" rx="2" {...common}/></>}
  </g>;
}
function ObjectIcon({kind,active}:{kind:Kind;active:boolean}) {return <svg viewBox="0 0 64 64" className={`object-icon ${active?'in-use':''}`} aria-hidden="true"><ObjectPaths kind={kind} active={active}/></svg>;}

const alphabetizedCultures = [...cultures].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
const cultureSearchAliases: Record<CultureId, string[]> = {
  western: ['united states', 'usa', '미국', '서양'],
  japanese: ['japan', '일본'],
  korean: ['korea', 'south korea', '한국', '대한민국'],
  chineseHotpot: ['china', '중국'],
  southIndian: ['india', '인도', '남인도'],
  ethiopian: ['ethiopia', '에티오피아'],
  filipino: ['philippines', '필리핀'],
  jordanian: ['jordan', '요르단'],
  frenchFrench: ['france', '프랑스'],
  frenchRussian: ['france', '프랑스'],
  spanishTapas: ['spain', '스페인'],
  italianFamily: ['italy', '이탈리아'],
  swedishSmorgasbord: ['sweden', '스웨덴'],
  georgianSupra: ['georgia', '조지아'],
  basquePintxos: ['basque country', '바스크'],
  britishAfternoonTea: ['britain', 'united kingdom', 'uk', '영국'],
};
const normalizeSearch = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

function FlagIcon({flag}:{flag:FlagId}) {
  const line={fill:'none',stroke:'#ededed',strokeWidth:1.5,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  return <svg className="flag-icon" viewBox="0 0 44 28" aria-hidden="true">
    <rect x="1" y="1" width="42" height="26" rx="1.5" fill="none" stroke="#ededed" strokeWidth="1"/>
    {flag==='us'&&<><path d="M2 5h40M2 9h40M2 13h40M2 17h40M2 21h40M2 25h40" {...line}/><rect x="2" y="2" width="17" height="11" fill="#000" stroke="#ededed" strokeWidth=".8"/><path d="m5 4 1 1 1-1m3 0 1 1 1-1m3 0 1 1 1-1M6 8l1 1 1-1m4 0 1 1 1-1" {...line}/></>}
    {flag==='uk'&&<><path d="m3 3 38 22M41 3 3 25" stroke="#ededed" strokeWidth="4"/><path d="m3 3 38 22M41 3 3 25" stroke="#000" strokeWidth="1.4"/><path d="M22 2v24M2 14h40" stroke="#ededed" strokeWidth="7"/><path d="M22 2v24M2 14h40" stroke="#000" strokeWidth="2.2"/></>}
    {flag==='japan'&&<circle cx="22" cy="14" r="7" fill="#ededed"/>}
    {flag==='korea'&&<><path d="M22 7a7 7 0 0 1 0 14 3.5 3.5 0 0 0 0-7 3.5 3.5 0 0 1 0-7Z" fill="#ededed"/><path d="M8 7 12 11M7 10l4 4M32 14l4 4m-4-1 4 4" {...line}/></>}
    {flag==='china'&&<><path d="m10 6 1.6 3.2 3.5.5-2.5 2.4.6 3.5-3.2-1.7-3.1 1.7.6-3.5L5 9.7l3.5-.5Z" fill="#ededed"/><circle cx="18" cy="6" r=".7" fill="#ededed"/><circle cx="20" cy="10" r=".7" fill="#ededed"/><circle cx="19" cy="15" r=".7" fill="#ededed"/><circle cx="16" cy="18" r=".7" fill="#ededed"/></>}
    {flag==='france'&&<><path d="M15 2v24M29 2v24" stroke="#ededed" strokeWidth="1"/><path d="M15 2h14v24H15z" fill="none" stroke="#ededed" strokeWidth=".8"/></>}
    {flag==='india'&&<><path d="M2 8h40M2 19h40" {...line}/><circle cx="22" cy="14" r="3.5" {...line}/><path d="M22 10.5v7m-3.5-3.5h7m-6-2.5 5 5m0-5-5 5" {...line}/></>}
    {flag==='ethiopia'&&<><path d="M2 10h40M2 19h40" {...line}/><circle cx="22" cy="14" r="4" {...line}/><path d="m22 10 1.2 2.7 2.8.2-2.1 1.8.7 2.7-2.6-1.5-2.5 1.5.6-2.7-2-1.8 2.7-.2Z" fill="#ededed"/></>}
    {flag==='philippines'&&<><path d="M3 5h39M3 10h39M3 15h39M3 20h39M3 25h39" {...line}/><path d="M2 2 20 14 2 26Z" fill="#000" stroke="#ededed" strokeWidth="1"/><circle cx="7" cy="14" r="2" fill="#ededed"/><path d="m12 6 .7 1.4 1.5.2-1.1 1.1.3 1.5-1.4-.7-1.3.7.2-1.5-1-1.1 1.4-.2Z" fill="#ededed"/></>}
    {flag==='jordan'&&<><path d="M2 9h40M2 18h40" {...line}/><path d="M2 2 20 14 2 26Z" fill="#000" stroke="#ededed" strokeWidth="1"/><path d="m8 10 .7 1.4 1.5.2-1.1 1.1.3 1.5-1.4-.7-1.3.7.2-1.5-1-1.1 1.4-.2Z" fill="#ededed"/></>}
    {flag==='spain'&&<><path d="M2 8h40M2 20h40" {...line}/><path d="M9 10h8v7H9z" {...line}/><circle cx="13" cy="13.5" r="1" {...line}/></>}
    {flag==='italy'&&<><path d="M15 2v24M29 2v24" {...line}/><path d="M15 2h14v24H15z" {...line}/></>}
    {flag==='sweden'&&<><path d="M14 2v24M2 13h40" stroke="#ededed" strokeWidth="5"/><path d="M14 2v24M2 13h40" stroke="#000" strokeWidth="1.4"/></>}
    {flag==='georgia'&&<><path d="M22 2v24M2 14h40" stroke="#ededed" strokeWidth="4"/><path d="M10 5v6m-3-3h6M34 17v6m-3-3h6M10 17v6m-3-3h6M34 5v6m-3-3h6" {...line}/></>}
    {flag==='basque'&&<><path d="m4 24 36-20M4 4l36 20" stroke="#ededed" strokeWidth="4"/><path d="m4 24 36-20M4 4l36 20" stroke="#000" strokeWidth="1.4"/><path d="M22 2v24M2 14h40" stroke="#ededed" strokeWidth="2"/></>}
  </svg>;
}

export default function App(){
  const [shape,setShape]=useState<TableShape>('round');
  const [guestCounts,setGuestCounts]=useState<Record<string,string>>({});
  const [language,setLanguage]=useState<LanguageId>('en');
  const [cultureSearch,setCultureSearch]=useState('');
  const [editingCultureId,setEditingCultureId]=useState<CultureId|null>(null);
  const ui=translations[language];
  const counts=Object.fromEntries(Object.entries(guestCounts).map(([country,value])=>[country,Math.max(0,Math.min(16,Number.parseInt(value,10)||0))]));
  const layout=getRecommendedLayout(shape,counts);
  const layoutKinds=[...new Set(layout.map(item=>item.kind))];
  const normalizedQuery=normalizeSearch(cultureSearch.trim());
  const cultureMatches=normalizedQuery?alphabetizedCultures.filter(culture=>[culture.name,culture.id,...cultureSearchAliases[culture.id]].some(term=>normalizeSearch(term).includes(normalizedQuery))):[];
  const selectedCultures=alphabetizedCultures.filter(culture=>(counts[culture.id]??0)>0||editingCultureId===culture.id);
  const activeCultures=alphabetizedCultures.filter(culture=>(counts[culture.id]??0)>0);

  const updateCount=(country:string,value:string)=>setGuestCounts(old=>({...old,[country]:value}));
  const changeCount=(country:string,amount:number)=>updateCount(country,String(Math.max(0,Math.min(16,(counts[country]??0)+amount))));
  const addCultureGuest=(cultureId:CultureId)=>changeCount(cultureId,1);

  return <main className="app-shell" lang={language}>
    <header className="topbar"><div className="brand-lockup"><div className="brand">THE FUSION TABLE</div><div className="brand-subtitle">A Customisable Dining System</div></div><label className="language-bar"><select className="language-select" value={language} onChange={event=>setLanguage(event.target.value as LanguageId)} aria-label={ui.language}>{languages.map(option=><option key={option.id} value={option.id}>{option.name}</option>)}</select></label></header>
    <div className="workspace">
      <aside className="library-panel" aria-label="Recommended tableware">{layoutKinds.map(kind=><div className="object-tile" key={kind} role="img" aria-label={ui.objectNames[kind]}><ObjectIcon kind={kind} active/><span className="object-name">{ui.objectNames[kind]}</span></div>)}</aside>
      <section className="stage-column">
        <div className="canvas-frame"><svg viewBox="0 0 1000 700" className="table-svg" aria-label="Recommended table arrangement">
          {shape==='round'?<circle cx="500" cy="350" r="290" className="table-outline"/>:shape==='square'?<rect x="210" y="60" width="580" height="580" rx="5" className="table-outline"/>:<rect x="100" y="150" width="800" height="400" rx="5" className="table-outline"/>}
          {layout.map(item=><g key={item.id} transform={`translate(${item.x} ${item.y}) rotate(${item.angle}) scale(${item.scale}) translate(-32 -32)`} className="placed-object">
            <ObjectPaths kind={item.kind} active/>
          </g>)}
        </svg></div>
        <div className="shape-picker">{(['round','square','rectangle'] as TableShape[]).map(option=><button key={option} onClick={()=>setShape(option)} className={`shape-button ${shape===option?'chosen':''}`} aria-label={`${ui[option]} table`} title={`${ui[option]} table`}><span className={`shape-icon ${option}`}/></button>)}</div>
      </section>
      <aside className="culture-panel">
        <div className="culture-controls">
          <div className="culture-title">{ui.culture}</div>
          <label className="culture-search-label" htmlFor="culture-search">{ui.culturePrompt}</label>
          <input id="culture-search" className="culture-search" type="search" value={cultureSearch} onChange={event=>setCultureSearch(event.target.value)} placeholder={ui.searchPlaceholder} autoComplete="off" />
          {normalizedQuery&&<div className="culture-results" role="list" aria-label={ui.culturePrompt}>
            {cultureMatches.length?cultureMatches.map(culture=><button type="button" className="culture-result" key={culture.id} onClick={()=>addCultureGuest(culture.id)} disabled={(counts[culture.id]??0)>=16} aria-label={`${culture.name} ${ui.addGuest}`}>
              <FlagIcon flag={culture.flag}/><span className="culture-result-name">{culture.name}</span><span className="culture-result-add" aria-hidden="true">+</span>
            </button>):<p className="culture-no-results">{ui.noCultureResults}</p>}
          </div>}
          <section className="selected-cultures" aria-label={ui.selectedCultures}>
            <div className="selected-cultures-title">{ui.selectedCultures}</div>
            {selectedCultures.map(culture=><div className="culture-row" key={culture.id}>
              <FlagIcon flag={culture.flag}/>
              <span className="culture-copy" dir="auto"><span className="culture-name">{culture.name}</span><small lang={language}>{ui.descriptions[culture.id]}</small></span>
              <div className="count-control">
                <button type="button" className="count-button" onClick={()=>changeCount(culture.id,-1)} disabled={(counts[culture.id]??0)<=0} aria-label={`${culture.name} ${ui.removeGuest}`}>−</button>
                <input type="number" min="0" max="16" step="1" value={guestCounts[culture.id]??'0'} onFocus={()=>setEditingCultureId(culture.id)} onChange={event=>updateCount(culture.id,event.target.value)} onBlur={()=>{updateCount(culture.id,String(counts[culture.id]??0));setEditingCultureId(current=>current===culture.id?null:current);}} aria-label={`${culture.name} ${ui.guestCount}`}/>
                <button type="button" className="count-button" onClick={()=>changeCount(culture.id,1)} disabled={(counts[culture.id]??0)>=16} aria-label={`${culture.name} ${ui.addGuest}`}>+</button>
              </div>
            </div>)}
          </section>
        </div>
        <section className="dining-tips" aria-label={ui.tableTips} aria-live="polite">
          <div className="dining-tips-title">{ui.tableTips}</div>
          {activeCultures.length?<div className="dining-tip-list">{activeCultures.map(culture=><article className="dining-tip" key={culture.id}>
            <div className="dining-tip-name">{culture.name}</div><p>{ui.cultureTips[culture.id]}</p>
          </article>)}</div>:<p className="dining-tip-empty">{ui.tipEmpty}</p>}
          <div className="dining-tip-disclaimer">{ui.tipDisclaimer}</div>
        </section>
      </aside>
    </div>
  </main>;
}
