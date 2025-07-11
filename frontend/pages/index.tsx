import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import ComponentLibrary from '../components/ComponentLibrary'
import BOMGenerator from '../components/BOMGenerator'
import dynamic from 'next/dynamic';
import { loadDesignFromLocalStorage } from '../utils/localStorage';

const DynamicHarnessCanvas = dynamic(() => import('../components/HarnessCanvas'), {
  ssr: false,
});

export default function Home() {
  const [components, setComponents] = useState<any[]>([]); // Using any for now, will define types later
  const [wires, setWires] = useState<any[]>([]); // Using any for now, will define types later

  useEffect(() => {
    const loadedDesign = loadDesignFromLocalStorage();
    setComponents(loadedDesign.components);
    setWires(loadedDesign.wires);
  }, []);

  return (
    <div>
      <Head>
        <title>WireForge</title>
        <meta name="description" content="Automotive Wiring Harness Design Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: 'flex' }}>
        <ComponentLibrary />
        <DynamicHarnessCanvas components={components} setComponents={setComponents} wires={wires} setWires={setWires} />
      </main>

      <BOMGenerator components={components} wires={wires} />
    </div>
  )
}
