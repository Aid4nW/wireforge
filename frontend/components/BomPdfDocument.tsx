import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Component, Wire } from '../utils/types';
import useHarnessSettingsStore from '../store/useHarnessSettingsStore';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  logo: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 30,
    right: 30,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 5,
  },
});

interface BomPdfDocumentProps {
  components: Component[];
  wires: Wire[];
  selectedColumns: string[];
  logo: string | null;
}

const BomPdfDocument: React.FC<BomPdfDocumentProps> = ({ components, wires, selectedColumns, logo }) => {
  const { globalServiceLoopLength, globalTwistPitch } = useHarnessSettingsStore.getState();

  const getEffectiveWireLength = (wire: Wire): number => {
    let effectiveLength = wire.length;

    const serviceLoopAdd = wire.serviceLoop?.length === 'default' ? globalServiceLoopLength : wire.serviceLoop?.length;
    if (serviceLoopAdd) {
      effectiveLength += serviceLoopAdd;
    }

    const twistPitch = wire.twist?.pitch === 'default' ? globalTwistPitch : wire.twist?.pitch;
    if (twistPitch) {
      effectiveLength *= 1.05; // Same 5% increase as in BOMGenerator
    }
    return effectiveLength;
  };

  const bomData = components.map(comp => ({
    Component: comp.type,
    Quantity: 1,
    'Custom Properties': JSON.stringify(comp.customProperties || {}),
  }));

  const wireData = wires.map(wire => ({
    Wire: wire.id,
    'Length (mm)': getEffectiveWireLength(wire).toFixed(2),
    'Service Loop': wire.serviceLoop?.length === 'default' ? `Default (${globalServiceLoopLength}mm)` : `${wire.serviceLoop?.length || 0}mm`,
    'Twist': wire.twist?.pitch === 'default' ? `Default (${globalTwistPitch}mm)` : `${wire.twist?.pitch || 0}mm`,
    'Custom Properties': JSON.stringify(wire.customProperties || {}),
  }));

  const allData = [...bomData, ...wireData];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {logo && <Image style={styles.logo} src={logo} />}
        <Text style={styles.header}>Bill of Materials</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            {selectedColumns.map(column => (
              <Text key={column} style={styles.tableColHeader}>{column}</Text>
            ))}
          </View>
          {allData.map((row, i) => (
            <View key={i} style={styles.tableRow}>
              {selectedColumns.map(column => (
                <Text key={column} style={styles.tableCol}>{(row as any)[column]}</Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default BomPdfDocument;
