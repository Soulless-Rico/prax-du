<script setup>
  import { ref } from 'vue' 

  const grid = ref([
      ['#ffffff', '#ffffff', '#3b82f6'],
      ['#ffffff', '#ffffff', '#22c55e'],
      ['#ffffff', '#ffffff', '#ef4444']
    ])

  const definedColor = ref('#000000');

  function paint(rowIndex, colIndex) {
    grid.value[rowIndex][colIndex] = definedColor.value;
  }

  function changePaint(color) {
    definedColor.value = color;
  }

  function addColumn() {
    const totalColumns = grid.value[0].length;
    const newRow = [];
    for (let i = 0; i < totalColumns; i++)
    {
      newRow.push('#ffffff');
    }

    grid.value.push(newRow);
  }

  function addRow() {
    grid.value.forEach(row => row.push('#ffffff'));
  }

  function removeRow() {
    grid.value.pop();
  }

  function removeColumn() {
    grid.value.forEach(row => row.pop());
  }

  function paintAll() {
    grid.value.forEach(row => {
      row.forEach((_, index) => {
        row[index] = definedColor.value
      });
    });
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  function paintAllRandom() {
    grid.value.forEach(row => {
      row.forEach((_, index) => {
        row[index] = getRandomColor()
      });
    });
  }

</script>

<template>
  <div class="app-container">
    <div class="picker-box">
      <input type="color" v-model="definedColor" class="main-picker">
      <span class="color-code">{{ definedColor }}</span>
    </div>
    
    <div class="grid">
      <div class="row" v-for="(row, rowIndex) in grid" :key="rowIndex">
        <div
          class="pixel"
          v-for="(column, colIndex) in row"
          :key="colIndex"
          :style="{ backgroundColor: column }"
          @click="paint(rowIndex, colIndex)"
        />
      </div>
    </div>

    <div class="btn-container">
      <button class="btn red-btn" @click="changePaint('#ef4444')">Red</button>
      <button class="btn green-btn" @click="changePaint('#22c55e')">Green</button>
      <button class="btn blue-btn" @click="changePaint('#3b82f6')">Blue</button>
      <button class="btn" @click="addRow()">Add Row</button>
      <button class="btn" @click="addColumn()">Add Column</button>
      <button class="btn" @click="removeRow()">Remove Row</button>
      <button class="btn" @click="removeColumn()">Remove Column</button>
      <button class="btn action-btn" @click="paintAll()">Paint All</button>
      <button class="btn random-btn" @click="paintAllRandom()">Random Paint</button>
    </div>
  </div>
</template>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, #0f172a 0%, #1a202c 100%);
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #e0e7ff;
  }

  .grid {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 1.5rem;
    background: #1e293b;
    border-radius: 8px;
    border: 2px solid #334155;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }

  .row {
    display: flex;
    gap: 2px;
  }

  .pixel {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .pixel:hover {
    transform: scale(1.05);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
  }

  .btn-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 900px;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    background-color: #64748b;
  }

  .btn:hover {
    background-color: #475569;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(100, 116, 139, 0.4);
  }

  .red-btn {
    background-color: #ef4444;
  }

  .red-btn:hover {
    background-color: #dc2626;
    box-shadow: 0 8px 16px rgba(239, 68, 68, 0.4);
  }

  .green-btn {
    background-color: #22c55e;
  }

  .green-btn:hover {
    background-color: #16a34a;
    box-shadow: 0 8px 16px rgba(34, 197, 94, 0.4);
  }

  .blue-btn {
    background-color: #3b82f6;
  }

  .blue-btn:hover {
    background-color: #2563eb;
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.4);
  }

  .action-btn {
    background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
  }

  .action-btn:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
    box-shadow: 0 12px 24px rgba(139, 92, 246, 0.4);
  }

  .random-btn {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  }

  .random-btn:hover {
    background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
    box-shadow: 0 12px 24px rgba(249, 115, 22, 0.4);
  }

  .picker-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    background: #1e293b;
    border-radius: 8px;
    border: 2px solid #334155;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }

  .picker-box label {
    font-size: 1rem;
    font-weight: 600;
  }

  .main-picker {
    width: 80px;
    height: 50px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .color-code {
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: #cbd5e1;
  }
</style>