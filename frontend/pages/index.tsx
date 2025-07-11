import Head from 'next/head'
import React, { useState } from 'react';
import HarnessCanvas from '../components/HarnessCanvas'
import ComponentLibrary from '../components/ComponentLibrary'
import BOMGenerator from '../components/BOMGenerator'

export default function Home() {
  const [components, setComponents] = useState<any[]>([]); // Using any for now, will define types later
  const [wires, setWires] = useState<any[]>([]); // Using any for now, will define types later

  return (
    <div>
      <Head>
        <title>WireForge</title>
        <meta name="description" content="Automotive Wiring Harness Design Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: 'flex' }}>
        <ComponentLibrary />
        <HarnessCanvas components={components} setComponents={setComponents} wires={wires} setWires={setWires} />
      </main>

      <BOMGenerator components={components} wires={wires} />
    </div>
  )
}
