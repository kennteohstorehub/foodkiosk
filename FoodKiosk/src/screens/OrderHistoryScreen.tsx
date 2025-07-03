import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Card, Chip, Surface, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'completed' | 'preparing' | 'ready' | 'cancelled';
  estimatedTime?: string;
  paymentMethod?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    date: '2024-01-15',
    time: '12:30 PM',
    items: [
      { name: 'Big Mac', quantity: 2, price: 7.99 },
      { name: 'Coca-Cola', quantity: 1, price: 2.49 },
    ],
    total: 20.47,
    status: 'preparing',
    estimatedTime: '10 mins',
    paymentMethod: 'Card',
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    date: '2024-01-15',
    time: '11:15 AM',
    items: [
      { name: 'Quarter Pounder', quantity: 1, price: 9.49 },
      { name: 'Chicken McNuggets', quantity: 1, price: 6.99 },
      { name: 'Apple Pie', quantity: 2, price: 1.99 },
    ],
    total: 20.46,
    status: 'ready',
    estimatedTime: 'Ready',
    paymentMethod: 'Cash',
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    date: '2024-01-14',
    time: '2:45 PM',
    items: [
      { name: 'Big Mac', quantity: 1, price: 7.99 },
      { name: 'McFlurry Oreo', quantity: 1, price: 3.49 },
    ],
    total: 12.36,
    status: 'completed',
    paymentMethod: 'Card',
  },
  {
    id: '4',
    orderNumber: 'ORD-004',
    date: '2024-01-13',
    time: '7:20 PM',
    items: [
      { name: 'Chicken McNuggets', quantity: 2, price: 6.99 },
      { name: 'Coca-Cola', quantity: 2, price: 2.49 },
    ],
    total: 19.94,
    status: 'completed',
    paymentMethod: 'Card',
  },
];

const OrderHistoryScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filters = [
    { id: 'all', name: 'All Orders', count: mockOrders.length },
    { id: 'preparing', name: 'Preparing', count: mockOrders.filter(o => o.status === 'preparing').length },
    { id: 'ready', name: 'Ready', count: mockOrders.filter(o => o.status === 'ready').length },
    { id: 'completed', name: 'Completed', count: mockOrders.filter(o => o.status === 'completed').length },
  ];

  const filteredOrders = selectedFilter === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'preparing':
        return '#FF9800';
      case 'ready':
        return '#2196F3';
      case 'cancelled':
        return '#FF4500';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'check-circle';
      case 'preparing':
        return 'schedule';
      case 'ready':
        return 'notifications';
      case 'cancelled':
        return 'cancel';
      default:
        return 'help';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Pickup';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const reorder = (order: Order) => {
    console.log('Reordering:', order.orderNumber);
    // TODO: Implement reorder functionality
  };

  if (mockOrders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="history" size={80} color="#ddd" />
        <Text style={styles.emptyText}>No orders yet</Text>
        <Text style={styles.emptySubtext}>Your order history will appear here once you place your first order</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Surface style={styles.header}>
        <Text style={styles.headerTitle}>Order History</Text>
        <Text style={styles.headerSubtitle}>Track your orders and reorder favorites</Text>
      </Surface>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              style={[
                styles.filterItem,
                selectedFilter === filter.id && styles.filterItemSelected
              ]}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextSelected
              ]}>
                {filter.name}
              </Text>
              {filter.count > 0 && (
                <Badge style={[
                  styles.filterBadge,
                  selectedFilter === filter.id && styles.filterBadgeSelected
                ]}>
                  {filter.count}
                </Badge>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersContainer} showsVerticalScrollIndicator={false}>
        {filteredOrders.map((order) => (
          <Surface key={order.id} style={styles.orderCard} elevation={2}>
            <TouchableOpacity 
              onPress={() => toggleOrderDetails(order.id)}
              style={styles.orderHeader}
            >
              <View style={styles.orderHeaderLeft}>
                <View style={styles.orderTitleRow}>
                  <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                  <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(order.status) }]}>
                    <Icon name={getStatusIcon(order.status)} size={14} color="#fff" />
                  </View>
                </View>
                <Text style={styles.orderDate}>{order.date} at {order.time}</Text>
                <Text style={styles.orderItems}>
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </Text>
              </View>
              
              <View style={styles.orderHeaderRight}>
                <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
                <View style={styles.statusRow}>
                  <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                    {getStatusText(order.status)}
                  </Text>
                  {order.estimatedTime && order.status !== 'completed' && (
                    <Text style={styles.estimatedTime}>{order.estimatedTime}</Text>
                  )}
                </View>
                <Icon 
                  name={expandedOrder === order.id ? 'expand-less' : 'expand-more'} 
                  size={20} 
                  color="#666" 
                />
              </View>
            </TouchableOpacity>

            {expandedOrder === order.id && (
              <View style={styles.orderDetails}>
                <View style={styles.orderItemsList}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.orderMetadata}>
                  <View style={styles.metadataRow}>
                    <Icon name="payment" size={16} color="#666" />
                    <Text style={styles.metadataText}>
                      Payment: {order.paymentMethod}
                    </Text>
                  </View>
                  <View style={styles.metadataRow}>
                    <Icon name="schedule" size={16} color="#666" />
                    <Text style={styles.metadataText}>
                      Ordered: {order.date} at {order.time}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderActions}>
                  <TouchableOpacity
                    style={styles.reorderButton}
                    onPress={() => reorder(order)}
                  >
                    <Icon name="refresh" size={16} color="#FF6B35" />
                    <Text style={styles.reorderText}>Reorder</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.receiptButton}>
                    <Icon name="receipt" size={16} color="#666" />
                    <Text style={styles.receiptText}>Receipt</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Surface>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f8f9fa',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
  filtersSection: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginBottom: 10,
  },
  filtersContainer: {
    paddingHorizontal: 15,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  filterItemSelected: {
    backgroundColor: '#FF6B35',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterBadge: {
    backgroundColor: '#666',
    color: '#fff',
    marginLeft: 5,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    fontSize: 10,
  },
  filterBadgeSelected: {
    backgroundColor: '#fff',
    color: '#FF6B35',
  },
  ordersContainer: {
    flex: 1,
    padding: 15,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  orderItems: {
    fontSize: 12,
    color: '#999',
  },
  orderHeaderRight: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 3,
  },
  statusRow: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  estimatedTime: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  orderItemsList: {
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    width: 30,
    fontWeight: '500',
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  orderMetadata: {
    marginBottom: 15,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  metadataText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6B35',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  reorderText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  receiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
  },
  receiptText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
});

export default OrderHistoryScreen; 