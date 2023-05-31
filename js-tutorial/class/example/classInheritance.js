// extends

{
	class Animal {
		constructor(name) {
			this.speed = 0;
			this.name = name;
		}

		run(speed) {
			this.speed = speed;
			console.log(`${this.name}은/는 속도 ${this.speed}로 달립니다.`);
		}

		stop() {
			this.speed = 0;
			console.log(`${this.name}이 멈췄습니다.`);
			console.log(`${this.name}의 속도: ${this.speed}`);
		}
	}
	let animal = new Animal('얼룩말');

	animal.run(300);
	animal.stop();

	{
		class Rabbit extends Animal {
			hide() {
				console.log(`${this.name}이/가 숨었습니다!`);
			}
		}

		let rabbit = new Rabbit('흰 토끼');

		rabbit.run(5);
		rabbit.stop();
		rabbit.hide();
	}
	// extends 뒤에 표현식이 올 수도 있다.

	const f = (phrase) => {
		return class {
			sayHi() {
				console.log(phrase);
			}
		};
	};

	class User extends f('Hello') {} // == class User extends class { sayHi() { alert(phrase) }

	new User().sayHi(); // Hello

	{
		// Override
		class Rabbit extends Animal {
			hide() {
				console.log(`${this.name}가 숨었습니다!`);
			}
			stop() {
				super.stop();
				this.hide();
			}
		}

		let rabbit = new Rabbit('검은 토끼');

		rabbit.run(500);
		rabbit.stop();
	}
	{
		// arrowFunction은 super가 없다. 스코프 벗어나서 찾는다.
		class Rabbit extends Animal {
			stop() {
				setTimeout(() => super.stop(), 1000); // 1초 후의 부모의 stop을 호출한다.
			}

			// arrowFunction의 super는 stop()의 super와 같아서 위 예시는 의도한대로 동작함. 하지만 일반 함수(Function(){})를 사용하면 에러가 발생할 것
		}
	}
}
