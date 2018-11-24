var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Author = require('../models/authorSchema');
const Book = require('../models/bookSchema');
const User = require('../models/userSchema');
const RentBook = require('../models/rentBookSchema');

/* GET users listing. */

router.post('/signin', function(req, res, next) {
  User.findOne({email: req.body.email, password: req.body.password})
  .then(user => {
    if(!user) {
      res.send({status: false, msg: 'no user'})
    } else {
      res.send({status: true, user: {email: user.email, _id: user._id}})
    }
  }).catch(err => {
    console.log(err)
    res.send({status: false})
  })
})
router.post('/signup', function(req, res, next) {
  new User({
    email: req.body.email,
    password: req.body.password,
    salt: 'abcd'
  }).save((err, user) => {
    if(err) {
      console.log(err)
      res.send({status: false, err})
    } else {
      res.send({status: true})
    }
  })
})

router.get('/authors', function(req, res, next) {
  Author.find({})
  .then(authors => {
    res.send({status: true, authors})
  })
  .catch(err => {
    console.log(err)
    res.send({status: false})
  })
});

router.get('/users', function(req, res, next) {
  User.find({})
  .then(users => {
    res.send({status: true, users})
    console.log(users)
  })
  .catch(err => {
    console.log(err)
    res.send({status: false})
  })
});

router.get('/books', function(req, res, next) {
  Book.find({})
  .then(books => {
    res.send({status: true, books})
  })
  .catch(err => {
    console.log(err)
    res.send({status: false})
  })
});

router.get('/rentList/:id', function(req, res, next) {
  RentBook.find({borrower: req.params.id, returnDate: undefined})
  .populate({
    path: 'book',
    model: Book
  })
  .then(name => {
    res.send({status: true, name})
  })
  .catch(err => {
    console.log(err)
    res.send({status: false})
  })
});

router.get('/author/:id', function(req, res, next) {
  Author.findOne({_id: req.params.id})
  .then(author => {
    Book.find({author: author._id})
    .then(books => {
      res.send({status: true, author, books})
    })
    .catch(err => {
      res.send({status: false})
    })
  })
  .catch(err => {
    res.send({status: false})
  })
});

router.get('/user/:id' , function(req,res,next) {
  User.findOne({_id: req.params.id})
  .then(users =>{
    res.send({status: true, count: users.bookLentCount})
  })
  .catch(err => {
    res.send({status: false})
  })
});

router.get('/rentbook/limit/:id' , function(req,res,next) {
  console.log(req.params.id)
  RentBook.countDocuments({borrower: mongoose.Types.ObjectId(req.params.id), returnDate: undefined})
  .then(count =>{
    res.send({status: true, count})
  })
  .catch(err => {
    res.send({status: false})
  })
});

router.get('/book/:id', function(req, res, next) {
  Book.findOne({_id: req.params.id})
  .populate({
    path: 'author',
    model: Author
  })
  .then(book => {
    res.send({status: true, book})
  })
  .catch(err => {
    console.log(err)
    res.send({status: false})
  })
});

router.get('/rentbook/rent/:id' , function(req,res,next) {
  Book.update({_id: req.params.id}, {$set:{quantity: -1}})
  .then(() =>{
    res.send({status: true})
  })
  .catch(err => {
    res.send({status: false})
  })
});



router.post('/rent', function(req,res,next) {
  var rentDate = new Date()
  var returnDueDate = new Date(new Date() + (7 * 24 * 60 * 60 * 1000))
  Book.update({_id: req.body.book}, {$inc :{quantity: -1}})
  .then(() => {
    new RentBook({
      book: req.body.book,
      borrower: req.body.user,
      rentDate: rentDate,
      returnDueDate: returnDueDate
    }).save(err => {
      if(err) {
        console.log(err)
        res.send({status: false, err})
      } else {
        res.send({status: true})
      }
    })
  })
  .catch(err => {
    res.send({status: false})
  })
})

router.post('/return', function(req,res,next) {
  var returnDate = new Date()
  Book.update({_id: req.body.book}, {$inc :{quantity: 1}})
  .then(() => {
    RentBook.update({_id:req.body.rentList}, {$set: {returnDate: returnDate}})
    .then(() =>{
      res.send({status: true})
    })
    .catch((err) =>{
      res.send({status: false})
      console.log(err);
    })
  })
  .catch(err => {
    res.send({status: false})
  })
})



const word = ['Ace','Betty','Canon','David','East','Fatty','Growning','Harry','Isaac','Jack','Kelly','Lilly','Mary','Nelson','Oston','Philip','Queen','Ryan','Simon','Todd','Ured','VI','W.','Yvern','Zedd']
const word2 = `bird
office
screw
homosexual
modernize
stem
just
easy
creed
dirty
yearn
angle
profession
understanding
compliance
whisper
plastic
glasses
enfix
satisfied
tense
minister
entitlement
movie
chew
feather
sense
knit
threshold
chapter
ego
shelter
lip
carbon
pier
site
order
tune
wardrobe
salvation
stuff
put
engineer
meal
corner
shave
carriage
ethnic
visible
shadow
siege
square
communist
weight
center
jet
buy
tray
slow
construct
pupil
uniform
menu
advertising
room
roof
name
needle
fall
disagreement
lamb
last
diameter
favorable
science
groan
contempt
laser
copyright
orange
cunning
contact
duck
toast
lobby
robot
environment
roll
eaux
improve
houseplant
transparent
road
punish
spider
brag
woman
mastermind
feedback
candidate
metal
writer
anger
lace
suffer
unrest
attractive
convert
flawed
minimize
silence
spokesperson
giant
shed
wilderness
get
radiation sickness
discovery
conceive
classroom
log
normal
reader
break in
embark
nature
medium
retain
communication
rhythm
quotation
sink
bitter
expansion
occupation
module
winter
coincide
garage
situation
breathe
support
temporary
brush
undertake
grand
share
park
cabinet
loss
thank
inappropriate
match
tire
thick
ally
safe
privacy
debate
chair
curve
flush
pit
flow
cancel
reliance
run
knock
obscure
unanimous
conscience
thinker
harsh
monarch
terrace
gallery
pot
scratch
throne
low
crude
orientation
hill
smell
characteristic
turn
execute
wind
acceptance
separate
patience
break
election
jail
state
wheel
list
carrot
coast
burst
old
blank
good
particular
definite
egg white
core
element
analysis
change
rebel
refund
pair
extent
volume
board
diamond
wander
pyramid
tragedy
knot
constitution
mind
behavior
minority
essay
gown
craft
bomber
cruelty
reason
beard
presidential
trainer
notebook
crowd
march
terms
credit card
adviser
despair
house
cheese
public
attention
activate
cinema
infrastructure
rugby
pill
pick
command
chimney
farewell
wrist
invisible
solve
base
folk
polite
relinquish
battlefield
sacrifice
swallow
prison
gravel
discreet
knowledge
bean
variant
familiar
power
hear
romantic
strategic
flavor
stain
scatter
denial
band
screen
wonder
rub
evoke
harvest
check
veil
charter
learn
use
wage
legend
fold
guess
standard
humanity
motif
property
active
monster
spit
chip
motorcycle
formal
nail
jest
Venus
trick
shoot
collection
venture
pest
fling
raise
cottage
compromise
ordinary
indulge
wait
contract
confusion
riot
way
fragment
owe
steak
cry
turkey
atmosphere
temperature
despise
assumption
demonstration
responsible
baby
paradox
magnitude
policy
recommend
breakfast
bark
witch
integration
definition
chorus
displace
advertise
scream
fan
comprehensive
limited
outlook
revolution
continuation
speculate
fax
build
court
headline
physical
clean
planet
wreck
introduce
content
horoscope
garlic
deprive
grandfather
kill
sleep
announcement
fisherman
colorful
girlfriend
quantity
wrong
admit
teenager
hospital
revenge
harbor
surface
throw
word
population
convenience
marketing
horse
fabricate
point
tower
parallel
detector
extend
torture
ensure
horizon
friendly
project
discriminate
initiative
parade
ladder
inspiration
supply
sandwich
pavement
pension
daughter
publication
racism
unlike
idea
truck
trend
commission
strikebreaker
intervention
broadcast
realism
twin
poor
slap
mutter
bounce
oppose
architecture
determine
exile
elephant
global
promise
maximum
broccoli
mouth
direction
illustrate
jewel
defeat
pen
problem
established
express
patrol
withdrawal
conscious
presentation
wear out
folk music
pioneer
magazine
anxiety
shot
entertain
kinship
applaud
drift
superintendent
disappear
recording
tease
glue
peasant
tool
lover
coverage
shame
acquit
transfer
fortune
dish
withdraw
shy
brain
kid
automatic
jam
fist
dose
balance
market
endorse
suspect
depend
head
supplementary
wear
beer
concede
revise
rotate
ideal
video
swell
poetry
employee
strip
soul
honor
earwax
noise
career
strap
mug
machinery
lane
avenue
style
joy
plan
resign
expose
vein
drag
knife
include
acid
person
ranch
lack
shallow
equip
possible
jaw
ban
mathematics
speaker
harm
distortion
deliver
merchant
qualification
pour
calorie
repetition
constant
branch
home
key
habit
hostile
unaware
musical
personal
survival
grind
therapist
belief
demand
lounge
feign
suspicion
failure
impress
snuggle
dictionary
cash
straight
forum
miner
debt
negligence
information
betray
amber
seller
copper
fuel
dressing
series
aspect
freighter
official
mouse
seat
passion
sum
occupy
reproduction
infinite
jurisdiction
digital
clue
arrange
body
error
tactic
fault
plug
immune
recession
domination
alive
vat
recommendation
shareholder
height
Bible
business
priority
joke
steep
cell phone
grandmother
prize
disappoint
bronze
pepper
fence
range
still
deport
aluminium
scrape
publicity
ministry
reasonable
attract
valley
pray
strength
weigh
desert
literacy
linear
warning
split
cooperative
deposit
bike
decisive
society
cabin
sheep
exit
sample
dismiss
frighten
differ
approve
desire
cake
twilight
satisfaction
recruit
depart
rotation
pie
gain
write
insert
elect
acquaintance
see
sun
continental
outlet
wave
faithful
excuse
cup
develop
foster
flesh
present
deviation
innocent
bowel
upset
buttocks
overwhelm
nationalism
lost
comfort
voice
blonde
identification
country
slogan
crusade
unique
address
dangerous
scan
high
prejudice
sigh
kick
reduction
twitch
catalogue
outer
feed
authorise
pattern
difficulty
couple
courtship
raid
firefighter
engagement
convulsion
cell
bridge
result
color-blind
ring
work
complain
whole
assembly
pledge
duty
proclaim
allow
sensitivity
stride
meet
pop
soap
dark
increase
city
vegetarian
money
rush
meadow
commitment
adventure
correspond
leftovers
memorial
burn
peace
seed
wolf
glacier
artificial
fee
print
retailer
ash
retreat
runner
administration
reckless
sunshine
ton
cylinder
grace
review
impound
injection
river
iron
sulphur
think
solution
promotion
product
concert
comfortable
cemetery
personality
junior
smart
quest
past
fashion
secretary
entertainment
means
trouser
prince
total
sustain
ear
spine
judgment
palm
strain
know
hotdog
fail
budget
snarl
colon
pole
muggy
soprano
conspiracy
facade
devote
uncle
system
voter
potential
queue
cheek
season
measure
enjoy
handicap
rifle
relaxation
mail carrier
stamp
seize
tear
pile
double
light
credibility
unfair
progressive
basket
vote
conductor
contribution
multimedia
inject
mutual
talk
census
arise
hurl
bleed
overlook
miserable
growth
professor
suffering
grateful
hammer
slime
cat
scale
dialect
urge
blast
hypnothize
orgy
arrogant
ratio
chest
fast
document
goalkeeper
chemistry
compensation
bomb
vacuum
nonremittal
settlement
unpleasant
execution
look
winner
grief
attack
regular
fare
excavation
skilled
white
bare
proof
work out
physics
requirement
pardon
diet
radio
dignity
agony
guilt
offer
conservation
cucumber
dough
press
reach
stay
other
exemption
island
mirror
session
worm
relate
evening
pan
mechanism
rehearsal
land
repeat
locate
psychology
inn
landscape
suggest
scheme
generate
eject
sheet
extreme
explosion
party
lung
go
percent
rank
lift
seem
teacher
cycle
guerrilla
deter
symptom
redeem
important
stream
profound
latest
chain
control
tender
nightmare
tenant
candle
restrain
help
climb
fever
subject
thread
ice
bake
clock
apple
citizen
promote
frank
behave
node
absolute
greeting
clothes
dialogue
snail
direct
castle
option
sodium
tube
obstacle
decorative
telephone
cower
spite
director
mushroom
galaxy
future
microphone
salad
jury
fog
disturbance
shaft
sand
gradual
forge
air
cheap
chord
publish
left
abundant
pack`.split('\n')
const genres = ['Science Fiction','Satire','Drama','Action and Adventure','Romance','Mystery','Horror','Self help','Health','Guide','Travel','Children\'s','Science','History','Math','Poetry','Art','Cookbooks','Diaries','Series','Triology','Journals','Fantasy','Anthology','Encyclopedias','Dictionaries','Comis']
Book.find({})
.then(books => {
  if(books.length == 0) {
    for(var i=0;i<100;i++) {
      new Author({
        name: word[parseInt(Math.random() * word.length)] + ' ' + word[parseInt(Math.random() * word.length)],
        birthDate: new Date(parseInt(Math.random() * 100) + 1900, parseInt(Math.random() * 12), parseInt(Math.random() * 31))
      }).save()
    }
    Author.find({})
    .then(authors => {
      for(var i=0;i<1000;i++) {
        new Book({
          name: word2[parseInt(Math.random() * word2.length)] + ' ' + word2[parseInt(Math.random() * word2.length)] + ' ' + word2[parseInt(Math.random() * word2.length)] + ' ' + word2[parseInt(Math.random() * word2.length)],
          author: authors[parseInt(Math.random() * (authors.length - 1))]._id,
          writtenDate: new Date(parseInt(Math.random() * 100) + 1900, parseInt(Math.random() * 12), parseInt(Math.random() * 31)),
          genre: genres[parseInt(Math.random() * genres.length)],
          quantity: parseInt(Math.random() * 20 + 1) * 5
        }).save()
      }
    })
  }
})

module.exports = router;
