"use client";
import {useState,useEffect} from "react";
import {usePathname} from "next/navigation";import Link from "next/link";
export function Topbar(){const [name,setName]=useState("FixFlow");useEffect(()=>{const refresh=()=>setName(localStorage.getItem("fixflow-business-name")||"FixFlow");refresh();window.addEventListener("fixflow-settings-updated",refresh);return ()=>window.removeEventListener("fixflow-settings-updated",refresh)},[]);const path=usePathname().split('/')[2]||"Dashboard";return <header className="h-16 bg-white border-b flex items-center justify-between pl-16 pr-4 lg:px-8"><p className="font-bold capitalize">{name} / {path.replaceAll('-',' ')}</p><Link href="/" className="text-sm text-brand-primary font-semibold">View website ↗</Link></header>}
