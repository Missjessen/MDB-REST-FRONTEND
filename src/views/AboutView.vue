<template>
    <div class="min-h-screen bg-gradient-to-b from-[#f5f6fa] to-[#eaeef5] text-gray-800 p-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold">Order Dashboard</h1>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">Linda W.</span>
          <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
  
      <!-- Filters -->
      <div class="bg-white shadow-md rounded-2xl p-4 mb-4 flex flex-wrap gap-4 items-center">
        <input type="text" placeholder="Search for order" class="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none" />
        <select class="px-4 py-2 bg-gray-100 rounded-full text-sm">
          <option>Completed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
        <select class="px-4 py-2 bg-gray-100 rounded-full text-sm">
          <option>Paid</option>
          <option>Unpaid</option>
        </select>
        <input type="date" class="px-4 py-2 bg-gray-100 rounded-full text-sm" />
        <input type="date" class="px-4 py-2 bg-gray-100 rounded-full text-sm" />
      </div>
  
      <!-- Orders Table -->
      <div class="bg-white shadow-lg rounded-2xl overflow-hidden">
        <table class="w-full text-left text-sm">
          <thead class="bg-[#f9fafc] text-gray-500 uppercase">
            <tr>
              <th class="py-3 px-4">Order</th>
              <th class="py-3 px-4">Items</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4">Payment</th>
              <th class="py-3 px-4">Cost</th>
              <th class="py-3 px-4">Total</th>
              <th class="py-3 px-4">Balance</th>
              <th class="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t hover:bg-gray-50">
              <td class="py-3 px-4 font-medium">#B2039JW</td>
              <td class="py-3 px-4">Beam Wide Flange (W) - CS</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Pending Approval</span>
              </td>
              <td class="py-3 px-4">Credit Card</td>
              <td class="py-3 px-4">$12,249</td>
              <td class="py-3 px-4">$12,249</td>
              <td class="py-3 px-4">$0</td>
              <td class="py-3 px-4 text-right">
                <button class="text-blue-600 hover:underline text-sm">View</button>
              </td>
            </tr>
            <tr class="border-t hover:bg-gray-50">
              <td class="py-3 px-4 font-medium">#AW6UJIE</td>
              <td class="py-3 px-4">Beam Wide Flange (W) - CS</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Delivered</span>
              </td>
              <td class="py-3 px-4">Credit Card</td>
              <td class="py-3 px-4">$12,249</td>
              <td class="py-3 px-4">$12,249</td>
              <td class="py-3 px-4">$0</td>
              <td class="py-3 px-4 text-right">
                <button class="text-blue-600 hover:underline text-sm">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  // Add props or logic if needed
  </script>
  
  <style scoped>
  /* Optional: Add soft shadows, animations or transitions */
  </style>
  