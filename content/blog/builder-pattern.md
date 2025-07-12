---
title: "Patrón Builder en el Frontend"
description: "Una introducción al uso del patrón Builder"
date: 2025-07-10
categories: ["design-patterns", "frontend", "TypeScript"]
---

<!-- ![Cabecera post Patrón Builder](/images/blog/builder-pattern.png) -->

# Frontend Elegante y Eficiente con Patrones de Diseño

¿Alguna vez has intentado crear un objeto en JavaScript o TypeScript y te has encontrado con un constructor interminable?
¿Demasiados parámetros? ¿Código desordenado?
¡El **Patrón Builder** puede salvarte de este caos!

## Un poco de contexto histórico
Hace unos años (muchos), el desarrollo front-end era mucho más simple: un poco de HTML, algo de CSS y, con suerte, algo de JavaScript.

Pero todo cambió con la aparición de los frameworks modernos: React, Vue.js, Angular...

Estos frameworks revolucionaron la forma en que desarrollamos software, permitiéndonos:
- Crear interfaces más dinámicas e interactivas.
- Trabajar con componentes reutilizables.
- Manejar mejor el estado de las aplicaciones.
- Integrar herramientas para mejorar la productividad y el rendimiento.

En resumen, nos dieron una base sólida para construir aplicaciones más avanzadas.

Sin embargo, esta evolución tuvo un precio: el desarrollo front-end se volvió mucho más complejo.

Hoy en día, el front-end no solo se encarga de la presentación visual, sino también de manejar una gran cantidad de lógica.
Sin un plan claro, el código de nuestras aplicaciones puede volverse inmanejable.

En el mundo del desarrollo backend, los patrones de diseño llevan décadas ayudando a los desarrolladores a crear software más robusto y organizado.
Estos mismos conceptos han demostrado ser igual de útiles en el desarrollo front-end.

Esta serie de posts tratará de explicar los patrones de diseño que considero que pueden ser de más utilidad de una manera lo más sencilla posible, con ejemplos claros y aplicables a la vida real (nada de ejemplos de pizza o robots). Los ejemplos serán con TypeScript, ya que nos permite programar orientado a objetos de una manera más robusta, aunque casi todos estos patrones pueden aplicarse con Vanilla JavaScript. Dicho esto, vamos al grano.

## ¿Qué son los patrones de diseño?
**Son soluciones probadas a problemas comunes** cuando desarrollamos software.

### Tipos
Los patrones de diseño se pueden agrupar en tres tipos:

1. **Creacionales**: Ayudan a crear objetos de forma flexible y reutilizable.
2. **Estructurales**: Enseñan cómo combinar objetos y clases para construir estructuras grandes, manteniendo todo organizado y eficiente.
3. **De comportamiento**: Se centran en cómo los objetos colaboran entre ellos y dividen sus tareas de manera efectiva.

## 🚀 Patrón Builder

Es un patrón de diseño **creacional** que **nos permite construir objetos complejos paso a paso**.


### Escenario:
Tenemos que desarrollar una aplicación de viajes donde los usuarios puedan personalizar su paquete de viaje seleccionando vuelos, hoteles, diferentes actividades o añadir códigos de descuento.

**Primero veamos una primera aproximación** de cómo quedaría nuestro código sin aplicar ninguna estrategia ni patrón para que podamos ver con claridad las posibles desventajas.

```typescript
enum PaymentMethod {
  CREDIT_CARD = 'Tarjeta de crédito',
  STRIPE = 'Stripe',
  PAYPAL = 'PayPal',
}

class Flight {
  constructor(
    public airline: string,
    public departure: Date,
    public arrival: Date
  ) {}
}

class Hotel {
  constructor(public name: string, public nights: number) {}
}

//Clase principal
class Trip {
  customerName: string = '';
  destination: string = '';
  flight: Flight | undefined;
  hotel: Hotel | undefined;
  activities: string[] = [];
  couponCode: string | undefined;
  paymentMethod: PaymentMethod = PaymentMethod.CREDIT_CARD;

  // ❌ El constructor tiene demasiados parámetros 
  constructor(customerName: string, destination: string, flight: Flight, hotel: Hotel | undefined, activities: string[], couponCode: string | undefined, paymentMethod: PaymentMethod){
    this.customerName = customerName
    this.destination = destination
    this.flight = new Flight(flight.airline, flight.departure, flight.arrival)
    this.hotel = new Hotel(hotel?.name, hotel?.nights)
    this.activities = activities
    this.couponCode = couponCode
    this.paymentMethod = paymentMethod
  }

  toString() {
    return `\n*******************
    \nReserva realizada
    \n* Nombre: ${this.customerName}
    \n* Vuelo: 
      - Compañia area: ${this.flight?.airline}
      - Salida: ${this.flight?.departure.toDateString()}
      - Llegada: ${this.flight?.arrival.toDateString()}
    ${
      this.hotel
        ? `\n* Hotel:
      - Nombre: ${this.hotel?.name}
      - Noches: ${this.hotel?.nights}`
        : '\n* Ningun hotel seleccionado'
    }
    ${
      this.activities.length
        ? `\n* Actividades: ${this.activities.map((p) => p).join(', ')}`
        : '\n* Ninguna actividad seleccionada'
    }
    ${this.couponCode ? `\n* Código de descuento : ${this.couponCode}` : ''}
    \n* Método de pago: ${this.paymentMethod}`;
  }
}


// Uso/Implementación
class ClientTest {
  static execute() {
    console.clear();
    /**
     * PROBLEMA:
     * ❌ 1. Muy complejo de construir
     * ❌ 2. Necesitamos pasarle todos los parámetros para su construcción
     * ❌ 3. Podemos equivocarnos en cuanto al orden en el que pasamos los parámetros.
     * ❌ 4. Poco escalable y mantenible
     * ❌ 5. Tenemos que hacer uso de tipos como undefined o arrays vacíos...
     */

    // Creamos un primer viaje
    const trip1 = new Trip('Manuel Palermo', 'Maldivas', {airline: 'Iberia', departure: new Date('8-3-2025'), arrival: new Date('8-10-2025')}, {name: 'Intercontinental', nights: 6}, ['Senderismo', 'Buceo', 'Deportes acuáticos'], undefined, PaymentMethod.STRIPE);

    console.log(trip1.toString());

    /**
     * Creamos un segundo viaje con diferentes configuraciones.
     * 1. No ha seleccionado ningún hotel ya que pasará los días en casa de unos amigos.
     * 2. Ha añadido un código de descuento.
     * 3. No ha seleccionado ninguna actividad
     */
    const trip2 = new Trip('María Sánchez', 'Venecia', {airline: 'RyanAir', departure: new Date('4-16-2025'), arrival: new Date('4-26-2025')}, undefined, [], undefined, PaymentMethod.CREDIT_CARD);

    console.log(trip2.toString());
  }
}

ClientTest.execute();
```

El código anterior refleja los siguientes problemas:

| Problema                              | Consecuencia |
|---------------------------------------|-------------|
| 🔴 **Muchos parámetros en el constructor** | Hace difícil leer y mantener el código |
| 🔴 **Orden confuso de parámetros** | Se pueden cometer errores fácilmente |
| 🔴 **Poca flexibilidad** | Si se añaden más características, el código se vuelve inmanejable |
| 🔴 **Uso de valores indefinidos o arrays vacíos** | Hace que el código sea menos intuitivo y propenso a errores |


### Solución:
Una vez entendidos los requerimientos del cliente, deberemos tomar la decisión sobre cómo enfocaremos nuestro desarrollo y es aquí donde nos debemos plantear si existe algún patrón de diseño que resuelva nuestro problema. En este caso será el patrón Builder.

#### Usa el Patrón Builder cuando:

- ✅ Tu constructor tiene demasiados parámetros.
- ✅ Necesitas flexibilidad para construir objetos con diferentes configuraciones.
- ✅ Tu código debe ser escalable y reutilizable.

### Aplicando el patrón Builder

#### 1. Creación de la clase "Trip"
En el siguiente código el enum "PaymentMethod" que representa los posibles métodos de pago y las clases "Flight" y "Hotel" que representan un vuelo y un hotel respectivamente no son relevantes.
**Lo importante aquí es la clase Trip** que será nuestra **clase principal** y representará un viaje con las opciones requeridas por el cliente. 

```typescript
enum PaymentMethod {
  CREDIT_CARD = 'Tarjeta de crédito',
  STRIPE = 'Stripe',
  PAYPAL = 'PayPal',
}

class Flight {
  constructor(
    public airline: string,
    public departure: Date,
    public arrival: Date
  ) {}
}

class Hotel {
  constructor(public name: string, public nights: number) {}
}

// Clase Principal que representa un viaje
class Trip {
  customerName: string = '';
  destination: string = '';
  flight: Flight | undefined;
  hotel: Hotel | undefined;
  activities: string[] = [];
  couponCode: string | undefined;
  paymentMethod: PaymentMethod = PaymentMethod.CREDIT_CARD;

  toString() {
    return `\n*******************
    \nReserva realizada
    \n* Nombre: ${this.customerName}
    \n* Vuelo: 
      - Compañia area: ${this.flight?.airline}
      - Salida: ${this.flight?.departure.toDateString()}
      - Llegada: ${this.flight?.arrival.toDateString()}
    ${
      this.hotel
        ? `\n* Hotel:
      - Nombre: ${this.hotel?.name}
      - Noches: ${this.hotel?.nights}`
        : '\n* Ningun hotel seleccionado'
    }
    ${
      this.activities.length
        ? `\n* Actividades: ${this.activities.map((p) => p).join(', ')}`
        : '\n* Ninguna actividad seleccionada'
    }
    ${this.couponCode ? `\n* Código de descuento : ${this.couponCode}` : ''}
    \n* Método de pago: ${this.paymentMethod}`;
  }
}
```
---

#### 2. Creación clase con el patrón Builder

Creamos la interfaz "TripBuilder" que define los métodos que deberá usar la clase que la implemente.

Creamos nuestra clase "TripBuilderImpl" e implementamos nuestra interfaz "TripBuilder".
En cada método de esta clase hacemos un return de "this" que hará referencia "TripBuilderImpl". Por último en el método "build" (último paso para la creación de nuestro objeto) retorna "this.trip" que es la instancia del viaje "Trip" que previamente inyectamos en el constructor.

```typescript

interface TripBuilder {
  addCustomerName(name: string): TripBuilder;
  addDestination(name: string): TripBuilder;
  addFlight(airline: string, departure: Date, arrival: Date): TripBuilder;
  addHotel(name: string, nights: number): TripBuilder;
  addActivity(activity: string): TripBuilder;
  addCoupon(code: string): TripBuilder;
  addPayment(method: PaymentMethod): TripBuilder;
  build(): Trip;
}

class TripBuilderImpl implements TripBuilder {
  constructor(private trip: Trip = new Trip()) {}

  addCustomerName(name: string): TripBuilder {
    this.trip.customerName = name;
    return this;
  }
  addDestination(name: string): TripBuilder {
    this.trip.destination = name;
    return this;
  }
  addFlight(airline: string, departure: Date, arrival: Date): TripBuilder {
    this.trip.flight = new Flight(airline, departure, arrival);
    return this;
  }
  addHotel(name: string, nights: number): TripBuilder {
    this.trip.hotel = new Hotel(name, nights);
    return this;
  }
  addActivity(activity: string): TripBuilder {
    this.trip.activities.push(activity);
    return this;
  }
  addCoupon(code: string): TripBuilder {
    this.trip.couponCode = code;
    return this;
  }
  addPayment(payment: PaymentMethod): TripBuilder {
    this.trip.paymentMethod = payment;
    return this;
  }

  // El método build finalmente devolverá la instancia del objeto Trip
  build(): Trip {
    return this.trip;
  }
}

```
---

#### 3. Implementación y uso
Por último, solo nos queda ver un ejemplo de cómo sería la implementación del patrón. En este punto podemos ver lo comentado en el paso anterior, la constante "trip1" y "trip2" son de tipo "Trip" porque el método build retorna la instancia del propio viaje por lo que ya tendríamos acceso a todos los atributos y métodos de este objeto.

```typescript

// Uso/Implementación
class ClientTest {
  static execute() {
    console.clear();
    // Creamos un primer viaje
    const trip1 = new TripBuilderImpl()
      .addCustomerName('Manuel Palermo')
      .addDestination('Maldivas')
      .addFlight('Iberia', new Date('8-3-2025'), new Date('8-10-2025'))
      .addHotel('Intercontinental', 6)
      .addActivity('Senderismo')
      .addActivity('Buceo')
      .addActivity('Deportes acuáticos')
      .addPayment(PaymentMethod.STRIPE)
      .build();

    console.log(trip1.toString());

    /**
     * Creamos un segundo viaje con diferentes configuraciones.
     * 1. No ha seleccionado ningún hotel ya que pasará los días en casa de unos amigos.
     * 2. Ha añadido un código de descuento.
     * 3. No ha seleccionado ninguna actividad
     */
    const trip2 = new TripBuilderImpl()
      .addCustomerName('María Sánchez')
      .addDestination('Venecia')
      .addFlight('RyanAir', new Date('4-16-2025'), new Date('4-26-2025'))
      .addCoupon('AF435435')
      .addPayment(PaymentMethod.CREDIT_CARD)
      .build();

    console.log(trip2.toString());
  }
}

ClientTest.execute();
```

---

### Juntando todo

```typescript
import './style.css';

enum PaymentMethod {
  CREDIT_CARD = 'Tarjeta de crédito',
  STRIPE = 'Stripe',
  PAYPAL = 'PayPal',
}

class Flight {
  constructor(
    public airline: string,
    public departure: Date,
    public arrival: Date
  ) {}
}

class Hotel {
  constructor(public name: string, public nights: number) {}
}

// Clase Principal que representa un viaje
class Trip {
  customerName: string = '';
  destination: string = '';
  flight: Flight | undefined;
  hotel: Hotel | undefined;
  activities: string[] = [];
  couponCode: string | undefined;
  paymentMethod: PaymentMethod = PaymentMethod.CREDIT_CARD;

  toString() {
    return `\n*******************
    \nReserva realizada
    \n* Nombre: ${this.customerName}
    \n* Vuelo: 
      - Compañia area: ${this.flight?.airline}
      - Salida: ${this.flight?.departure.toDateString()}
      - Llegada: ${this.flight?.arrival.toDateString()}
    ${
      this.hotel
        ? `\n* Hotel:
      - Nombre: ${this.hotel?.name}
      - Noches: ${this.hotel?.nights}`
        : '\n* Ningun hotel seleccionado'
    }
    ${
      this.activities.length
        ? `\n* Actividades: ${this.activities.map((p) => p).join(', ')}`
        : '\n* Ninguna actividad seleccionada'
    }
    ${this.couponCode ? `\n* Código de descuento : ${this.couponCode}` : ''}
    \n* Método de pago: ${this.paymentMethod}`;
  }
}

interface TripBuilder {
  addCustomerName(name: string): TripBuilder;
  addDestination(name: string): TripBuilder;
  addFlight(airline: string, departure: Date, arrival: Date): TripBuilder;
  addHotel(name: string, nights: number): TripBuilder;
  addActivity(activity: string): TripBuilder;
  addCoupon(code: string): TripBuilder;
  addPayment(method: PaymentMethod): TripBuilder;
  build(): Trip;
}

class TripBuilderImpl implements TripBuilder {
  constructor(private trip: Trip = new Trip()) {}

  addCustomerName(name: string): TripBuilder {
    this.trip.customerName = name;
    return this;
  }
  addDestination(name: string): TripBuilder {
    this.trip.destination = name;
    return this;
  }
  addFlight(airline: string, departure: Date, arrival: Date): TripBuilder {
    this.trip.flight = new Flight(airline, departure, arrival);
    return this;
  }
  addHotel(name: string, nights: number): TripBuilder {
    this.trip.hotel = new Hotel(name, nights);
    return this;
  }
  addActivity(activity: string): TripBuilder {
    this.trip.activities.push(activity);
    return this;
  }
  addCoupon(code: string): TripBuilder {
    this.trip.couponCode = code;
    return this;
  }
  addPayment(payment: PaymentMethod): TripBuilder {
    this.trip.paymentMethod = payment;
    return this;
  }
  build(): Trip {
    return this.trip;
  }
}

// Uso/Implementación
class ClientTest {
  static execute() {
    console.clear();
    // Creamos un primer viaje
    const trip1 = new TripBuilderImpl()
      .addCustomerName('Manuel Palermo')
      .addDestination('Maldivas')
      .addFlight('Iberia', new Date('8-3-2025'), new Date('8-10-2025'))
      .addHotel('Intercontinental', 6)
      .addActivity('Senderismo')
      .addActivity('Buceo')
      .addActivity('Deportes acuáticos')
      .addPayment(PaymentMethod.STRIPE)
      .build();

    console.log(trip1.toString());

    /**
     * Creamos un segundo viaje con diferentes configuraciones.
     * 1. No ha seleccionado ningún hotel ya que pasará los días en casa de unos amigos.
     * 2. Ha añadido un código de descuento.
     * 3. No ha seleccionado ninguna actividad
     */
    const trip2 = new TripBuilderImpl()
      .addCustomerName('María Sánchez')
      .addDestination('Venecia')
      .addFlight('RyanAir', new Date('4-16-2025'), new Date('4-26-2025'))
      .addCoupon('AF435435')
      .addPayment(PaymentMethod.CREDIT_CARD)
      .build();

    console.log(trip2.toString());
  }
}

ClientTest.execute();

```

## Conclusion

El patrón builder es un patrón creacional que nos ayudará en la creación paso a paso de objetos complejos y que pueden ser creados con diferentes configuraciones. Esto hará que nuestro código sea más limpio, escalable y mantenible.

Los patrones de diseño son soluciones increíblemente poderosas que nos ayudan a resolver problemas concretos de una manera efectiva. Son atemporales y pueden ser utilizados junto con cualquier framework moderno. 