"use client";
import {useState} from "react";
import Link from "next/link";
import {Menu,X} from "lucide-react";
import {Sidebar} from "./Sidebar";
import {Topbar} from "./Topbar";
export function AdminLayoutShell({children}:{children:React.ReactNode}){const [collapsed,setCollapsed]=useState(false);const [mobile,setMobile]=useState(false);return <div className="min-h-screen bg-[#f8fafc]"><button aria-label={mobile?"Close navigation":"Open navigation"} aria-expanded={mobile} onClick={()=>setMobile(!mobile)} className="lg:hidden fixed top-4 left-4 z-[70] rounded-lg bg-white border p-2">{mobile?<X size={20}/>:<Menu size={20}/>}</button>{mobile&&<button aria-label="Close navigation overlay" className="fixed inset-0 bg-black/30 z-[45] lg:hidden" onClick={()=>setMobile(false)}/>}<div className={mobile?"block":"hidden lg:block"}><Sidebar isCollapsed={collapsed} setIsCollapsed={setCollapsed}/></div><div className={collapsed?"lg:pl-[64px]":"lg:pl-[240px]"}><Topbar/><div className="bg-sky-50 border-b text-sky-900 px-6 py-3 text-sm flex flex-wrap gap-3 items-center justify-between"><span>Business demo · sample records and browser-only requests</span><Link href="/demo" className="font-bold underline">Demo overview</Link></div><main onClick={()=>setMobile(false)} className="p-4 md:p-8 overflow-x-auto">{children}</main></div></div>}
